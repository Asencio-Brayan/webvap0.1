import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();
const secret = process.env.JWT_SECRET || 'secret';

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id }, secret, { expiresIn: '1d' });
    res.json({ token, user: { id: admin.id, email: admin.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protect all routes below
router.use(authMiddleware);

// GET /api/admin/me
router.get('/me', async (req: AuthRequest, res) => {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.adminId },
      select: { id: true, email: true },
    });
    if (!admin) return res.status(404).json({ error: 'Not found' });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/products
router.get('/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: 'desc' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/products
router.post('/products', async (req, res) => {
  try {
    const data = req.body;
    const product = await prisma.product.create({
      data: {
        name: data.name,
        brand: data.brand,
        category: data.category,
        price: data.price,
        flavor: data.flavor,
        nicotine: data.nicotine,
        stock: data.stock,
        featured: data.featured || false,
        image: data.image || '',
        description: data.description || '',
        specs: data.specs || {},
        images: data.images || [],
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/admin/products/:id
router.put('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.product.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/admin/products/:id/status
router.patch('/products/:id/status', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: 'Not found' });
    
    // Toggle stock between 0 and 10 as requested by the frontend logic
    const updated = await prisma.product.update({
      where: { id },
      data: { stock: product.stock > 0 ? 0 : 10 },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/admin/orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/admin/orders/:id/status
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/orders
router.post('/orders', async (req, res) => {
  try {
    const data = req.body;
    
    // Generate order ID (e.g. VQ-001)
    const count = await prisma.order.count();
    const orderId = `VQ-${String(count + 1).padStart(3, '0')}`;

    const newOrder = await prisma.order.create({
      data: {
        id: orderId,
        customerName: data.fullName,
        dni: data.dni,
        phone: data.phone,
        city: data.city,
        district: data.district,
        address: data.address,
        reference: data.reference,
        subtotal: data.subtotal,
        deliveryCost: data.deliveryCost,
        total: data.total,
        paymentMethod: data.paymentMethod,
        ageConfirmed: data.ageConfirmed,
        comments: data.comments,
        status: 'pendiente',
        items: {
          create: data.items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            brand: item.brand,
            price: item.price,
            quantity: item.quantity,
            flavor: item.flavor,
            nicotine: item.nicotine,
            image: item.image,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating manual order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

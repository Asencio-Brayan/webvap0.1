import { Router } from 'express';
import { prisma } from '../db';

const router = Router();

// POST /api/orders
router.post('/', async (req, res) => {
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
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

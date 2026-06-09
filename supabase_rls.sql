-- 1. Habilitar RLS en las tablas
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;

-- 2. Políticas para "Product"
-- Todo el mundo (anon y autenticados) puede LEER los productos
CREATE POLICY "Public profiles are viewable by everyone."
ON "Product" FOR SELECT
TO public
USING (true);

-- Solo usuarios autenticados (admin) pueden CREAR, ACTUALIZAR o ELIMINAR productos
CREATE POLICY "Admins can insert products"
ON "Product" FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Admins can update products"
ON "Product" FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Admins can delete products"
ON "Product" FOR DELETE
TO authenticated
USING (true);

-- 3. Políticas para "Order" y "OrderItem"
-- Todo el mundo puede CREAR pedidos (los clientes no están logueados cuando compran)
CREATE POLICY "Anyone can create an order"
ON "Order" FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can create order items"
ON "OrderItem" FOR INSERT
TO public
WITH CHECK (true);

-- Solo el administrador puede LEER, ACTUALIZAR o ELIMINAR pedidos
CREATE POLICY "Admins can read orders"
ON "Order" FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can update orders"
ON "Order" FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Admins can delete orders"
ON "Order" FOR DELETE
TO authenticated
USING (true);

-- Igual para los items del pedido
CREATE POLICY "Admins can read order items"
ON "OrderItem" FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can update order items"
ON "OrderItem" FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Admins can delete order items"
ON "OrderItem" FOR DELETE
TO authenticated
USING (true);

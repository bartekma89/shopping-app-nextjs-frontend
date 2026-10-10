import { CreateProduct } from "@/features/products/components/create-product";
import { Products } from "@/features/products/components/products";

export default async function Home() {
  return (
    <div>
      <main className="p-6">
        <Products />
        <CreateProduct />
      </main>
    </div>
  );
}

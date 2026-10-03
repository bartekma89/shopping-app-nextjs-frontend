import { CreateProduct } from "@/components/product/create-product";
import { Products } from "@/components/product/products";

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

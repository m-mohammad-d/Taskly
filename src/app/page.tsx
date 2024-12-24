import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function Home() {
  return (
    <div className="flex gap-4">
      <Input />
      <Button>primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="muted">muted</Button>
      <Button variant="outline">outline</Button>
      <Button variant="teritary">outline</Button>
    </div>
  );
}

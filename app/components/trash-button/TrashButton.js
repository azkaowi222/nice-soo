"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
export const TrashButton = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8000/api/cart/items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    router.refresh();
  };
  return (
    <div>
      <Trash2
        size={20}
        color="red"
        onClick={handleDelete}
        className="cursor-pointer absolute top-2 right-2"
      />
    </div>
  );
};

"use client";

import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";

import { CreateProductForm } from "./create-product-form";

export const CreateProduct = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button
        className="fixed left-10 bottom-10"
        onClick={() => setModalVisible(true)}
      >
        <PlusCircleIcon />
      </Button>
      <Modal
        isOpen={modalVisible}
        onClose={handleClose}
        description="Fill in the details for your new product."
        title="Create Product"
      >
        <CreateProductForm onClose={handleClose} />
      </Modal>
    </>
  );
};

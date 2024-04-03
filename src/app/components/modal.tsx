import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useState, useEffect } from "react";
import closeIcon from '/public/images/closeIcon.png'
interface ModalType {
  isOpen: boolean;
  onClose?: () => void; // 모달을 닫을 때 호출할 함수
  children: React.ReactNode;
  size: string
  modalheight?:string
  modalColor?:string;
}

const CustomModal = ({ isOpen, onClose, children,size,modalheight, modalColor }: ModalType) => {
  
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 모달 외부를 클릭했을 때 모달을 닫음
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

//   const handleConfirmation = (selected:any) => {
//     if(selected) {
//         onConfirm(selected);
//     }
//     setOpen(false);
// }


const confirmPlace = (place:any) => {
    setSelected(place);
}

const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};



  return (
    <Modal open={open} onClose={handleClose}>
      <div onClick={handleInsideClick}>
      
        <Paper
          elevation={2}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: size,
            backgroundColor: modalColor || "white",
            maxWidth: "100%",
            maxHeight: "100%",
            overflowY: "auto",
          }}
          className={`h-[${modalheight}] sm:h-[100vh]`}
        >
          <Image
          src={closeIcon}
          alt="closeIcon"
          className="mr-6 mt-6 float-right cursor-pointer"
          onClick={handleClose}
        />
          {children}
        </Paper>
      </div>
    </Modal>
  );
};

export default CustomModal;

import Modal from "../components/Modal";

export function useModal() {
  const [open, setOpen] = useState(false);

  const setModal = ({ children }) => {
    return <Modal>{children}</Modal>;
  };

  return {
    open,
    setOpen,
    setModal
  };
}

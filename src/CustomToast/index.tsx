import { ToastContentProps } from 'react-toastify';

interface Props {
  message: string;
  retryFn: () => void;
}

const CustomToast = ({ closeToast, toastProps, message, retryFn }: ToastContentProps & Props) => {
  return (
    <div>
      {message} - {toastProps?.position}
      <button onClick={retryFn}>Retry</button>
      <button onClick={closeToast}>Close</button>
    </div>
  );
};

export default CustomToast;

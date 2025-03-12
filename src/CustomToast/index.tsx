import Loader2 from '@/components/shared/Loader/loader2';
import Tick from '@/lib/svg/Tick';
import X2 from '@/lib/svg/X2';
import Link from 'next/link';
import { ToastContentProps } from 'react-toastify';

interface TypedToastContentProps<T> extends ToastContentProps {
  data: T;
}

interface SuccessDataType {
  content: string;
}
interface ExploreDataType {
  content: string;
  link: string;
}

export const CustomSuccessToast = ({ data }: TypedToastContentProps<SuccessDataType>) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <Tick />
        </div>
        <p className="font-geist-medium text-[0.9375rem] text-white">{data.content}</p>
      </div>
    </div>
  );
};

export const CustomErrorToast = ({ data }: TypedToastContentProps<SuccessDataType>) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <X2 />
        </div>
        <p className="font-geist-medium text-[0.9375rem] text-white">{data.content}</p>
      </div>
    </div>
  );
};
export const CustomLoadingToast = ({ data }: TypedToastContentProps<SuccessDataType>) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <Loader2 />
        </div>
        <p className="font-geist-medium text-[0.9375rem] text-white">{data.content}</p>
      </div>
    </div>
  );
};
export const CustomExploreToast = ({ data }: TypedToastContentProps<ExploreDataType>) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <Loader2 />
        </div>
        <p className="font-geist-medium text-[0.9375rem] text-white">{data.content}</p>
      </div>
      <Link href={data.link} target="_blank">
        <div className="toast-explore-button">
          <p className="toast-explore-text font-geist-medium text-xs">Explorer</p>
        </div>
      </Link>
    </div>
  );
};

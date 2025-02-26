import React from 'react';
import Button from '../shared/Button';
import { RouteType } from '@/services/queries/coins/types';
import { useRouter } from 'next/navigation';
import { useExchangeContext } from '@/context/ExchangeContext';
import { AppRoutes } from '@/utils/routes';

interface IProps {
  value: string;
  activeRoute: RouteType;
  balance: string;
}

const ReviewButton = ({ value, activeRoute, balance }: IProps) => {
  const router = useRouter();
  const { updateActiveRoute } = useExchangeContext();
  const isSufficient = parseFloat((parseFloat(balance) - parseFloat(value)).toFixed(6)) >= 0;
  return (
    <Button
      className="h-14 w-full bg-primary-800 hover:bg-primary-800"
      disabled={!isSufficient}
      onClick={() => {
        updateActiveRoute(activeRoute);
        router.push(AppRoutes.review.path);
      }}
    >
      <p className="font-geist-medium text-[#080808]">{isSufficient ? 'Review Route' : 'Insufficient Balance'}</p>
    </Button>
  );
};

export default ReviewButton;

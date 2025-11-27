"use client";

import React from 'react';
import { Provider } from 'react-redux';
import store from './index';

type Props = {
  children: React.ReactNode;
};

export default function ReduxProviderWrapper({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

import { useState } from 'react';

export const useText = (defaultValue) => {
  return useState(defaultValue ?? '');
}
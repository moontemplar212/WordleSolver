import { useEffect, useState } from 'react';

export const useText = defaultValue => {
  return useState(defaultValue ?? '');
}

export const useArray = defaultValue => {
  return useState(defaultValue ?? []);
}

export const useInt = defaultValue => {
  return useState(defaultValue ?? 0);
}
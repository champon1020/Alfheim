import { MutableRefObject, useEffect, useRef } from "react";

export const countToMaxPage = (count: number, maxNum: number): number => {
  return Math.ceil(count / maxNum);
};

// Format date string which is RFC3339 to HHHH/MM/DD.
export const formatDateStr = (d?: string) => {
  if (d === undefined) return "";
  return d.substr(0, 10);
};

export const convertRefFromFunc = (ref: any): MutableRefObject<any> => {
  const targetRef = useRef();

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(targetRef.current);
    }
  }, [ref]);

  return targetRef;
};

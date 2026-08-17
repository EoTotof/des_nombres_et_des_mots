import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
) {
  const { className, ...otherProps } = props;

  return (
    <button
      className={clsx(
        "px-16 py-8 text-2xl text-white font-semibold bg-sky-600 rounded-lg cursor-pointer hover:bg-sky-700 active:bg-sky-800",
        className,
      )}
      {...otherProps}
    />
  );
}

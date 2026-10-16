import clsx from "clsx";
import Link from "next/link";
import { ButtonHTMLAttributes, ComponentPropsWithoutRef } from "react";

type ButtonProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
  | ComponentPropsWithoutRef<typeof Link>;

function isLinkProps(
  props: ButtonProps,
): props is ComponentPropsWithoutRef<typeof Link> {
  return "href" in props;
}

export default function Button(props: ButtonProps) {
  const classes = clsx(
    "px-16 py-8 text-2xl text-white font-semibold bg-sky-600 rounded-lg cursor-pointer hover:bg-sky-700 active:bg-sky-800",
    "transition-transform hover:scale-[1.05]",
    props.className,
  );

  if (isLinkProps(props)) {
    return <Link {...props} className={classes} />;
  }

  return <button {...props} className={classes} />;
}

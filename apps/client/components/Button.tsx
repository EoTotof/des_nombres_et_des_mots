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

export default function Button(
  props: ButtonProps & {
    color?: keyof typeof colorClassNames;
    disabled?: boolean;
  },
) {
  const { disabled } = props;

  const classes = clsx(
    "px-16 py-8 text-2xl text-white font-semibold rounded-lg",
    !disabled ? "cursor-pointer transition-transform hover:scale-[1.05]" : null,
    disabled ? "bg-slate-300" : colorClassNames[props.color || "primary"],
    props.className,
  );

  if (isLinkProps(props)) {
    return <Link {...props} className={classes} />;
  }

  return <button {...props} className={classes} />;
}

const colorClassNames = {
  primary: "bg-sky-600 hover:bg-sky-700 active:bg-sky-800",
  secondary: "bg-slate-500 hover:bg-slate-600 active:bg-slate-700",
};

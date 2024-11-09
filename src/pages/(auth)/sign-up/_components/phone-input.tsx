import { Input, InputProps } from "@/_components/ui/input";
import React, { forwardRef } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

export const MaskInput = forwardRef(
  (
    props: PatternFormatProps<InputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => (
    <PatternFormat
      {...props}
      customInput={Input}
      getInputRef={ref}
    />
  ),
);

MaskInput.displayName = "MaskInput";

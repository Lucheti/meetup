import React, { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { Input, InputWrapper, Tooltip } from "@mantine/core"
import { AlertCircle } from "tabler-icons-react"

export interface LabeledInputProps {
  /** Field name. */
  name: string
  /** Field label. */
  label?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "search" | "tel" | "url" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
  description?: string
  placeholder?: string
  required?: boolean
  icon?: React.ReactNode
  invalid?: boolean
  InputComponent?: React.FC
}

export const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  (
    { InputComponent = Input, name, required, label, outerProps, fieldProps, labelProps, ...props },
    ref
  ) => {
    const {
      input: { type, ...input },
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (!v ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const rightSection = (
      <Tooltip label={props.description} position="right" placement="center">
        <AlertCircle size={16} style={{ display: "block", opacity: 0.5 }} />
      </Tooltip>
    )

    return (
      <div {...outerProps}>
        <InputWrapper required label={label} error={touched && normalizedError}>
          <InputComponent
            invalid={touched && error !== undefined}
            required={required}
            type={props.type}
            {...input}
            disabled={submitting}
            {...props}
            ref={ref}
            rightSection={props.description && rightSection}
          />
        </InputWrapper>
      </div>
    )
  }
)

export default LabeledInput

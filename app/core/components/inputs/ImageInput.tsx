import React, { forwardRef } from "react"
import { LabeledInputProps } from "./LabeledInput"
import { useField } from "react-final-form"
import { StrapiApi } from "../../../../integrations/strapi"
import { ImageUpload } from "../imageUpload/imageUpload"
import { InputWrapper } from "@mantine/core"

export const ImageInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ name, outerProps, fieldProps, label, required }, ref) => {
    const {
      input: { value, onChange },
    } = useField(name, {
      ...fieldProps,
    })

    const onUpload = async (form: FormData) => {
      return StrapiApi.uploadImage(form)
        .then(async (res) => {
          const data = res[0]!
          await onChange({
            url_small: data.formats.small.url,
            url_medium: data.formats.medium.url,
            url_large: data.url,
          })
        })
        .catch(console.log)
    }

    return (
      <InputWrapper label={label} required={required}>
        <ImageUpload imageUrl={value?.url_medium} onUpload={onUpload} />
      </InputWrapper>
    )
  }
)

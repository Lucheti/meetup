import { InputWrapper, SegmentedControl } from "@mantine/core"

export const EnumInput = ({ enumeration, ...props }) => {
  const keys = Object.keys(enumeration || {})

  return (
    <SegmentedControl
      style={{ display: "flex" }}
      {...props}
      data={keys.map((key) => ({ label: key, value: enumeration[key] }))}
    />
  )
}

import { Chip, Chips, InputWrapper } from "@mantine/core"

export const EnumInput = ({ enumeration, ...props }) => {
  const keys = Object.keys(enumeration)

  return (
    <Chips {...props} mt={"4px"}>
      {keys.map((key) => (
        <Chip key={key} value={enumeration[key]}>
          {key}
        </Chip>
      ))}
    </Chips>
  )
}

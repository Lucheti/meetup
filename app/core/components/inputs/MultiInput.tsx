import React from "react"
import { FieldArray } from "react-final-form-arrays"
import { Box, Button, Container, Group, InputWrapper, Stack } from "@mantine/core"
import { CircleMinus, Plus } from "tabler-icons-react"
type MultiInputProps = {
  name: string
  label: string
  description?: string
  Input: React.FC<ChildInputProps>
  buttonLabel?: string
}

type ChildInputProps = {
  name: string
}

export const MultiInput = ({ name, label, buttonLabel, description, Input }: MultiInputProps) => {
  return (
    <InputWrapper label={label} description={description} required>
      <FieldArray name={name}>
        {({ fields }) => (
          <>
            <Stack spacing={"xl"}>
              {fields.map((name, index) => (
                <Group key={name}>
                  <Box style={{ flex: 1 }}>
                    <Input name={name} />
                  </Box>
                  <CircleMinus
                    color={"red"}
                    cursor={"pointer"}
                    onClick={() => fields.remove(index)}
                  />
                </Group>
              ))}
            </Stack>
            <Group position={"center"} mt={"md"} mb={"xl"}>
              <Button onClick={() => fields.push({})}>
                <Group spacing={"sm"}>
                  <Plus size={16} /> {buttonLabel}
                </Group>
              </Button>
            </Group>
          </>
        )}
      </FieldArray>
    </InputWrapper>
  )
}

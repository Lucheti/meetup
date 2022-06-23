import { AuthenticationError, PromiseReturnType, useMutation } from "blitz"
import { LabeledInput } from "app/core/components/inputs/LabeledInput"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import React from "react"
import { Anchor, Checkbox, Group } from "@mantine/core"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <Form
      submitText="Login"
      schema={Login}
      initialValues={{ identifier: "", password: "" }}
      onSubmit={async (values) => {
        console.log(values)
        try {
          const user = await loginMutation(values)
          props.onSuccess?.(user)
        } catch (error: any) {
          if (error instanceof AuthenticationError) {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
          } else {
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
            }
          }
        }
      }}
    >
      <LabeledInput
        name="identifier"
        label="Email or username"
        placeholder="Email or username"
        required
      />
      <LabeledInput
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
        required
      />
      <Group position="apart" mt="md">
        <Checkbox label="Remember me" />
        <Anchor<"a"> onClick={(event) => event.preventDefault()} href="#" size="sm">
          Forgot password?
        </Anchor>
      </Group>
    </Form>
  )
}

export default LoginForm

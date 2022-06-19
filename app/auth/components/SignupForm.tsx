import { useMutation } from "blitz"
import { LabeledInput } from "app/core/components/inputs/LabeledInput"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div>
      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledInput name="name" label="Name" placeholder="Name" />
        <LabeledInput name="email" label="Email" placeholder="Email" />
        <LabeledInput
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          description={"At least 10 characters"}
        />
      </Form>
    </div>
  )
}

export default SignupForm

import signup from "app/auth/mutations/signup"
import { useMutation } from "blitz"
import { LabeledInput } from "app/core/components/inputs/LabeledInput"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { Signup } from "app/auth/validations"
import { Grid } from "@mantine/core"
import { EnumInput } from "../../core/components/inputs/EnumInput"
import { Sex } from "../../../db"

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
        initialValues={{ email: "", password: "", name: "", lastName: "", sex: undefined }}
        onSubmit={async (values) => {
          console.log(values)
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            console.log(error)
            if (error.code === "P2002") {
              if (error.meta?.target?.includes("email"))
                return { email: "This email is already being used" }
              if (error.meta?.target?.includes("username"))
                return { username: "This username is already being used" }
            } else if (error.toString().includes("WEBPACK_DEFAULT_EXPORT")) {
              props.onSuccess?.()
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <Grid>
          <Grid.Col xs={12} md={6} lg={6}>
            <LabeledInput name="name" label="Name" placeholder="Name" />
          </Grid.Col>
          <Grid.Col xs={12} md={6} lg={6}>
            <LabeledInput name="lastName" label="Last name" placeholder="Last name" />
          </Grid.Col>
          <Grid.Col xs={12} md={12} lg={12}>
            <LabeledInput
              name={"sex"}
              label="Sex"
              required
              InputComponent={({ ...props }) => <EnumInput {...props} enumeration={Sex} />}
            />
          </Grid.Col>
          <Grid.Col xs={12} md={12} lg={12}>
            <LabeledInput name="username" label="Username" placeholder="Username" />
          </Grid.Col>
          <Grid.Col xs={12} md={12} lg={12}>
            <LabeledInput name="email" label="Email" placeholder="Email" />
          </Grid.Col>
          <Grid.Col xs={12} md={12} lg={12}>
            <LabeledInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              description={"At least 10 characters"}
            />
          </Grid.Col>
        </Grid>
      </Form>
    </div>
  )
}

export default SignupForm

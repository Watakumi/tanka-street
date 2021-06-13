import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function TankaForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="firstLine" label="firstLine" placeholder="firstLine" />
      <LabeledTextField name="secondLine" label="secondLine" placeholder="secondLine" />
      <LabeledTextField name="thirdLine" label="thirdLine" placeholder="thirdLine" />
      <LabeledTextField name="fourthLine" label="fourthLine" placeholder="fourthLine" />
      <LabeledTextField name="fifthLine" label="fifthLine" placeholder="fifthLine" />
    </Form>
  )
}

export const RichTextInput = ({ ...props }) => {
  const { RichTextEditor } = require("@mantine/rte")

  return (
    <RichTextEditor
      value={props.value}
      onChange={(value, ...rest) => {
        props.onChange(value)
      }}
      controls={[
        ["bold", "italic", "underline", "link"],
        ["unorderedList", "orderedList"],
        ["h1", "h2", "h3"],
        ["alignLeft", "alignCenter", "alignRight"],
      ]}
    />
  )
}

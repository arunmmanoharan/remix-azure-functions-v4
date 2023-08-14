import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  console.log("New-item action function", request.url);
  return redirect("/my-items");
};

export default function NewItem() {
  return (
    <div>
      <h1>New Item</h1>
      <Form method="post">
        <input type="text" name="name" placeholder="Your name" />
        <input type="submit" value="Submit" />
      </Form>
    </div>
  );
}

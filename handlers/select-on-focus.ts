import { FocusEventHandler } from "react";


export const selectOnFocus: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    event.currentTarget.select()
}
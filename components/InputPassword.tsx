import { InputHTMLAttributes, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const InputPassword = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} {...props} />
      <Button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
        size="sm"
        variant="ghost"
        tabIndex={-1}
      >
        {show ? "Hide" : "Show"}
      </Button>
    </div>
  );
};

export default InputPassword;

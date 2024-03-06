"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import isAuthenticated from "@/utils/helpers";

export default function Auth(Component) {
  return function IsAuth(props) {
    const auth = isAuthenticated();

    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}

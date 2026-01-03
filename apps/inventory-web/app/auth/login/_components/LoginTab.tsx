import React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const LoginTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to access your inventory</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

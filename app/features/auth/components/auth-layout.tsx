import Image from "next/image";
import Link from "next/link";

interface AuthProps {
  children: React.ReactNode;
}
export const AuthLayout = ({ children }: AuthProps) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href={"/"}
          className="flex items-center gap-2 font-medium self-center"
        >
          <Image
            src={"/logos/logo.svg"}
            alt={(process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Workflow" )+ " logo görseli"}
            width={50}
            height={50}
          />{" "}
          Workflow
        </Link>
        {children}
      </div>
    </div>
  );
};

import React from "react";
import {Link} from "react-router-dom";
export default function Footer() {
  return (
    <section className="text-center">
      <br />
      <br />
      <br />
      
      <table className="w-full">
        
        <tr className="w-full">
          <td align="center">
            <p className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-900">
              Acme corporation
            </p>
            <p className="mb-0 mt-[4px] text-[16px] leading-[24px] text-gray-500">
              Think different
            </p>
          </td>
        </tr>
        <tr>
          <td align="center">
            <tr className="table-cell h-[44px] w-[56px] align-bottom">
              <td className="pr-[8px]">
                <Link href="#">
                  <img
                    alt="Facebook"
                    height="36"
                    src="https://react.email/static/facebook-logo.png"
                    width="36"
                  />
                </Link>
              </td>
              <td className="pr-[8px]">
                <Link href="#">
                  <img
                    alt="X"
                    height="36"
                    src="https://react.email/static/x-logo.png"
                    width="36"
                  />
                </Link>
              </td>
              <td>
                <Link href="#">
                  <img
                    alt="Instagram"
                    height="36"
                    src="https://react.email/static/instagram-logo.png"
                    width="36"
                  />
                </Link>
              </td>
            </tr>
          </td>
        </tr>
        <tr>
          <td align="center">
            <p className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-500">
              123 Main Street Anytown, CA 12345
            </p>
            <p className="mb-0 mt-[4px] text-[16px] font-semibold leading-[24px] text-gray-500">
              mail@example.com +123456789
            </p>
          </td>
        </tr>
      </table>
    </section>
  );
}

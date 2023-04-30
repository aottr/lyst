import {IconAlignBoxBottomRight, IconBrandGithub} from "@tabler/icons-react";
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();
export default function Footer() {
    return (
        <footer className="body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center">
                    <IconAlignBoxBottomRight/>
                    <span className="ml-2 text-xl">Lyst</span>
                </a>

                <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                    <span className="badge badge-accent badge-xs mr-3">
                        v{publicRuntimeConfig.appVersion}
                    </span>
                    &copy; 2023 TailByte —
                    <a href="https://github.com/aottr" className="link link-accent ml-1" rel="noopener noreferrer"
                       target="_blank">@aottr</a>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <a className="btn btn-ghost" href="https://github.com/aottr/lyst">
          Get the code
        <IconBrandGithub className="w-5 h-5 ml-4"/>
      </a>
    </span>
            </div>
        </footer>
    );
}

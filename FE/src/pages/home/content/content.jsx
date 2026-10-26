import "./content.css";
import { ListCategory } from "../../../components/ComponentTemplates/category/category";
import ContainerContent from "../../../components/ComponentTemplates/ContainerContent/containerContent";
import Product from "../../../components/ComponentTemplates/products/products";
import BrandContainer from "../../../components/ComponentTemplates/brand/brand";
import BottomContentContainer from "../../../components/ComponentTemplates/BottomContentContainer/BottomContentContainer";
import logo from "../../../assets/logo-dior.png";
import TitleOfAIRecomment from "../../../components/CustomComponent/TitleContainerContent/TitleOfAIRecomment/TitleOfAIRecomment";
import TitleOfTrendind from "../../../components/CustomComponent/TitleContainerContent/TitleOfTrendind/TitleOfTrendind";
import TitleOfBrand from "../../../components/CustomComponent/TitleContainerContent/TitleOfBrand/TitleOfBrand";
import TitleOfSuggestion from "../../../components/CustomComponent/TitleContainerContent/TitleOfSuggestion/TitleOfSuggestion";
import TitleOfCategory from "../../../components/CustomComponent/TitleContainerContent/TitleOfCategory/TitleOfCategory";
import { useProducts } from "../../../hooks/useProducts";
import { getUser } from "../../../data/data";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { request } from "../../../api/request.api";
function ContainerHeader({
  bgCategory,
  bgDeal,
  bgBtn,
  title,
  desc,
  category,
  btn,
  deal,
}) {
  return (
    <>
      <p
        className={`${bgCategory} font-medium text-[12px] w-fit p-[0_10px] rounded-2xl`}
      >
        {category}
      </p>
      <p className="font-bold text-xl">{title}</p>
      <p className="text-sm text-gray-700">{desc}</p>
      <div className="flex justify-between">
        <button className={`${bgBtn} font-medium text-[15px]`}>{btn}</button>
        <p className={`${bgDeal} font-bold p-[0_10px] rounded-sm`}>{deal}</p>
      </div>
    </>
  );
}

getUser();
function Content() {
  let category = [
    {
      key: "beauty",
      title: "Làm đẹp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 512 489.87"
        >
          <path
            fill-rule="nonzero"
            d="M154.2 169.38h96.72L306.4 48.2c-25.43-20.11-60.13-30.54-96.35-31.61v81.74c0 4.61-3.66 8.35-8.18 8.35s-8.19-3.74-8.19-8.35V16.74c-35.88 1.69-71.92 12.39-100.84 31.79l61.36 120.85zm1.92 260.25h91.78V232.88h-91.78v196.75zm91.78 16.49h-91.78v27.09h91.78v-27.09zm16.49-157.61 71.96-63.69c3.39-3.01 8.58-2.69 11.59.71 3.01 3.39 2.69 8.59-.71 11.59l-82.84 73.34v32.65c.84.23 1.65.61 2.39 1.16a88.901 88.901 0 0 0 24.79 12.7 89.027 89.027 0 0 0 27.55 4.34c24.52 0 46.71-9.93 62.77-26 16.06-16.06 25.99-38.25 25.99-62.76 0-24.51-9.93-46.71-25.99-62.77-16.06-16.06-38.26-26-62.77-26-9.87 0-19.34 1.6-28.12 4.53a88.83 88.83 0 0 0-25.23 13.26c-.44.33-.9.6-1.38.82v33.35l29.97-26.87c3.38-3.03 8.58-2.74 11.6.64 3.02 3.38 2.74 8.57-.64 11.59l-38.91 34.89c-.62.55-1.3 1-2.02 1.33v31.19zm0-103.65c6.84-4.28 14.21-7.78 21.98-10.38 10.34-3.44 21.36-5.32 32.75-5.32 28.55 0 54.4 11.58 73.1 30.29 18.71 18.7 30.29 44.55 30.29 73.1 0 28.55-11.58 54.39-30.29 73.1-18.7 18.71-44.55 30.28-73.1 30.28-11.16 0-21.94-1.79-32.06-5.08-8.02-2.62-15.63-6.2-22.67-10.6v37.9c.49.1.98.25 1.46.45 8.3 3.51 17.01 6.23 26.03 8.05 8.7 1.76 17.82 2.68 27.24 2.68 37.77 0 71.98-15.31 96.73-40.06s40.06-58.95 40.06-96.72c0-37.78-15.31-71.98-40.06-96.73-24.75-24.74-58.95-40.06-96.73-40.06-6.43 0-12.67.43-18.69 1.25-6.23.85-12.33 2.12-18.26 3.78l-.1.03-17.68 38.61v5.43zm25.37-60.85c2.88-.56 5.79-1.05 8.73-1.45 6.83-.93 13.73-1.42 20.63-1.42 41.81 0 79.67 16.95 107.06 44.35 27.4 27.4 44.35 65.25 44.35 107.06 0 41.8-16.95 79.66-44.35 107.06a151.738 151.738 0 0 1-43.88 30.57h122.39c4.04 0 7.31 3.27 7.31 7.31v6.33c0 17.87-7.31 34.11-19.07 45.88-11.8 11.76-28.03 19.07-45.88 19.07H253.36c-1.71.6-3.55.93-5.46.93h-91.78c-4.53 0-8.67-1.85-11.65-4.84-2.98-2.97-4.84-7.1-4.84-11.65V177.63l.02-.58L74.93 49.59c-1.84-3.64-.71-8 2.48-10.33C112.74 13.26 158.98 0 203.79 0c44.5 0 87.85 13.07 118.15 39.71 2.96 2.6 3.6 6.86 1.76 10.17l-33.94 74.13zm-25.4 350.14h182.69c13.85 0 26.43-5.66 35.56-14.78 8.89-8.92 14.5-21.13 14.76-34.57H264.39v48.41l-.03.94zM5.67 289.73h8.6v-72.39c0-2.96 2.4-5.36 5.36-5.36h10.25V104.45c19.1 3.04 37.17 13.46 53.38 36.63v70.9h8.31c2.95 0 5.36 2.4 5.36 5.36v72.39h9.75c3.13 0 5.68 2.55 5.68 5.67v188.8c0 3.13-2.55 5.67-5.68 5.67H5.67c-3.12-.03-5.67-2.57-5.67-5.7V295.4c0-3.12 2.55-5.67 5.67-5.67zm19.28 0h61.26v-67.07H24.95v67.07zm131.17-73.35h91.78v-27.09l-91.78.02v27.07z"
          />
        </svg>
      ),
    },
    {
      key: "fragrances",
      title: "Nước hoa",
      icon: (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 99.29 122.88"
        >
          <title>perfume</title>
          <path d="M34.81,43.94a1.84,1.84,0,0,1-.41,0h-.24c-4.1.15-7,.39-7.58.73C17.4,50.25,11,59.31,7.55,69.23c14.06-2,25.76.28,37.28,2.52,14.68,2.86,29.06,5.66,47.45-1.09l-.11-.34C88.74,59.57,81.82,49.87,71.75,44.78c-1.28-.65-12.84-1-24.12-1-4.63,0-9.15.06-12.82.18ZM40.9,0H59.29a2,2,0,0,1,2,2V7.65a7.37,7.37,0,0,1,5.95,7.21V39.69c3.42.25,5.86.57,6.63,1,11.26,5.69,19,16.42,22.74,28.27a55.72,55.72,0,0,1,2.27,23.91c-1,7.83-3.94,15-8.83,20.44s-11.77,9-20.66,9.59l-.33,0H29.78a30.11,30.11,0,0,1-19.32-8.4C5,109.15,1.76,101.81.54,93.72A55.4,55.4,0,0,1,2.81,68.79c3.67-11.3,10.88-21.71,21.38-28.06.89-.54,3.84-.94,7.89-1.2V14.86a7.37,7.37,0,0,1,6-7.21V2.86A2.87,2.87,0,0,1,40.9,0ZM24.72,21.57a1.89,1.89,0,0,1,0,3.77H8a1.89,1.89,0,0,1,0-3.77Zm-.61,9.36a1.88,1.88,0,0,1,1.22,3.56L11.9,39.1a1.88,1.88,0,1,1-1.22-3.56l13.43-4.61Zm1.22-18.51A1.88,1.88,0,0,1,24.11,16L10.68,11.37A1.88,1.88,0,1,1,11.9,7.81l13.43,4.61Zm21.49,6.34a2.83,2.83,0,1,1,5.65,0V27.4a2.83,2.83,0,0,1-5.65,0V18.76ZM6.11,74.14A49.74,49.74,0,0,0,5.13,93c1.07,7.14,3.9,13.56,8.57,18.13A25.55,25.55,0,0,0,30,118.23H69.06c7.59-.47,13.4-3.49,17.53-8.06s6.76-11,7.68-17.94a50.42,50.42,0,0,0-.8-17.08c-19.41,7-34.31,4.12-49.52,1.15C32.23,74,20.31,71.7,6.11,74.14ZM62.57,39.42V14.86a2.73,2.73,0,0,0-2.71-2.7H39.43a2.71,2.71,0,0,0-1.91.8,2.66,2.66,0,0,0-.79,1.9V39.3c3.36-.13,7.12-.19,10.9-.19,5.17,0,10.46.11,14.94.31Z" />
        </svg>
      ),
    },
    {
      key: "furniture",
      title: "Nội thất",
      icon: (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122.88 108.34"
        >
          <title>furniture</title>
          <path d="M67.94,103.65v4.69H65v-4.69H17.7v4.68H14.81v-4.68H13.14a5.92,5.92,0,0,1-4-1.19,5.35,5.35,0,0,1-1.68-4.18V77.17a12.82,12.82,0,0,1-3.43-1.48A7.6,7.6,0,0,1,1.1,72.42c-2.06-4.55-1-8.37,1.42-11a10.85,10.85,0,0,1,4.07-2.64,11.43,11.43,0,0,1,4.8-.7,9.92,9.92,0,0,1,3.5.92V44.5c0-6,.9-9.12,3.2-10.86s5.52-1.78,10.44-1.78H50V3.64A3.65,3.65,0,0,1,53.63,0h65.61a3.65,3.65,0,0,1,3.64,3.64v94h-2.77v4.95H96.46V97.65H75.27v.58h0v0a5.32,5.32,0,0,1-1.68,4.18,6,6,0,0,1-4,1.19H67.94ZM96.43,46.87a1.6,1.6,0,1,1,3.19,0v8.37a1.6,1.6,0,0,1-3.19,0V46.87ZM88,3.19V94.46h31.66V3.64a.44.44,0,0,0-.45-.45ZM84.84,94.46V3.19H53.63a.44.44,0,0,0-.31.13.42.42,0,0,0-.14.32V31.86H54.3c5.35,0,8.61.21,10.75,2.12s2.77,5.2,2.77,11.28V59.6a10.78,10.78,0,0,1,4.7-1,11.77,11.77,0,0,1,4.53.94,10.21,10.21,0,0,1,3.71,2.66c2.2,2.51,3,6.11.86,10.29a8.26,8.26,0,0,1-2.92,3.17,13.18,13.18,0,0,1-3.43,1.52V94.46ZM17.79,61.23a10.21,10.21,0,0,1,2.08,3.85,11.76,11.76,0,0,1,.47,2.43,15.42,15.42,0,0,1,0,2.72v3.86H62.4V70.17a17,17,0,0,1,0-2.65A8.4,8.4,0,0,1,62.92,65a10.43,10.43,0,0,1,2-3.23V45.26c0-5.19-.41-7.89-1.8-9.13S59,34.75,54.3,34.75H28.53c-4.34,0-7.18,0-8.7,1.2s-2,3.58-2,8.55V61.23ZM20.34,77v4.86H62.4V77Zm-4.79-13.9a1.44,1.44,0,0,1-.42-.43,6.67,6.67,0,0,0-4-1.65,8.41,8.41,0,0,0-3.58.52,7.92,7.92,0,0,0-3,1.93c-1.69,1.78-2.39,4.48-.89,7.76a4.76,4.76,0,0,0,1.87,2,11.39,11.39,0,0,0,3.64,1.39h0a1.45,1.45,0,0,1,1.12,1.41V98.21a2.63,2.63,0,0,0,.66,2.05,3.3,3.3,0,0,0,2.12.51h4.31V70a11.4,11.4,0,0,0,0-2.26,9.07,9.07,0,0,0-.35-1.85,7.35,7.35,0,0,0-1.57-2.83Zm49.75,12a1.48,1.48,0,0,1,0,.9v7a1.66,1.66,0,0,1,0,.32,1.84,1.84,0,0,1,0,.33v17.13h4.3a3.41,3.41,0,0,0,2.13-.52,2.7,2.7,0,0,0,.66-2h0V76.05a1.44,1.44,0,0,1,1.24-1.43,11,11,0,0,0,3.5-1.39A5.31,5.31,0,0,0,79,71.17c1.51-3,1-5.41-.45-7.09a7.44,7.44,0,0,0-2.68-1.89,8.87,8.87,0,0,0-3.41-.72A7.13,7.13,0,0,0,65.59,66a5.87,5.87,0,0,0-.35,1.68A13.93,13.93,0,0,0,65.29,70v.13h0v4.93Zm-45,25.67H62.4v-16H20.34v16Z" />
        </svg>
      ),
    },
    {
      key: "groceries",
      title: "Tạp hóa",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 512 392.827"
        >
          <path d="M398.997 24.314c4.578-.614 8.753 1.172 10.924 11.655l1.285-.344c6.053-1.673 9.162-2.532 12.022-.8 3.084 1.902 3.487 5.211 4.217 12.025 1.017-.196 1.965-.373 2.81-.549 5.155-1.025 7.798-1.529 10.371.076 2.698 1.699 3.306 4.443 4.516 10.007l.388 1.732a87.96 87.96 0 003.065-1.026c4.96-1.659 7.531-2.527 10.189-1.073 2.924 1.588 3.385 4.447 4.375 10.427l.232 1.341c1.071-.287 2.039-.572 2.89-.825 4.261-1.218 6.556-1.885 9.1-.858 3.024 1.203 4.118 3.765 6.518 9.291l.665 1.531 18.78 3.202a3.734 3.734 0 013.058 4.28 3.947 3.947 0 01-.255.858 964.863 964.863 0 01-21.161 45.331h-85.839c-2.603-4.253-6.167-7.937-10.591-10.643-14.474-8.86-32.876-4.042-41.877 10.643h-44.197A897.373 897.373 0 01319.047 96.8c16.959-29.375 35.594-57.924 55.423-85.34 1.056-1.482 3.002-1.925 4.603-1.183l9.755 4.627c1.313.617 2.086 1.888 2.145 3.248.53 6.641 1.075 8.101 1.622 8.055.527-.038 1.429-.381 2.33-.726 1.27-.493 2.57-.969 4.072-1.167zM26.116 146.243v-39.268c0-3.059 2.268-5.525 5.083-5.525h121.718c2.793 0 5.083 2.466 5.083 5.525 0 .19 0 .38-.022.546l-.287 29.28h333.857c11.317 0 20.452 13.868 20.452 24.419v28.861c0 13.461-10.957 24.421-24.419 24.421h-16.009L457.6 373.405c-.411 5.209-2.664 10.022-6.177 13.543l.022.022c-3.613 3.612-8.489 5.851-14.069 5.851H178.01c-.292 0-.581-.005-.87-.018l-58.323.001c-.154.023-.328.023-.48.023-.175 0-.327 0-.48-.023H5.083c-2.814 0-5.083-2.467-5.083-5.525V193.217c0-1.352.437-2.585 1.2-3.557l24.916-43.417zM63.7 246.997c.199.919.422 1.826.664 2.726.238-.899.457-1.807.652-2.726 5.083 23.57 25.046 40.714 25.046 54.609 0 7.398-2.466 13.729-7.375 19.017-4.93 5.288-10.821 7.944-17.671 7.944-.221 0-.439-.004-.657-.009-.218.005-.438.009-.659.009-6.828 0-12.697-2.656-17.628-7.944-4.931-5.288-7.374-11.619-7.374-19.017 0-13.99 19.984-30.921 25.002-54.609zm59.72-47.994v182.774h50.376l-.349-182.774H123.42zm-10.167 182.774V199.003H10.145v182.774h103.108zm25.744-242.339h8.553l.262-26.962H36.282v26.962h6.087v11.263h-6.741l-.327.569-20.422 36.707h100.796l27.424-37.252h-4.102v-11.287zm-21.555 0h11.061v11.263h-11.061v-11.263zm-21.533 0h11.061v11.263H95.909v-11.263zm-21.534 0h11.062v11.263H74.375v-11.263zm-21.555 0h11.061v11.263H52.82v-11.263zm98.788 17.262l-22.995 31.277h40.776l-17.338-31.304-.253.345-.19-.318zm45.49-55.373l68.234-.002c.582 0 1.056.474 1.056 1.056l-2.696 27.849h-64.96l-2.682-27.75a1.054 1.054 0 01.949-1.146l.099-.007zm.345-91.758a4.75 4.75 0 01-4.747-4.747 4.75 4.75 0 014.747-4.747h19.381A8.01 8.01 0 01217.913 0h26.195c.368 0 .734.026 1.093.075h25.443c1.355 0 2.575.569 3.441 1.479l12.114 12.112a4.744 4.744 0 01-6.709 6.708L268.682 9.569h-16.415v25.372a4.082 4.082 0 012.773 1.199 4.072 4.072 0 011.202 2.895v21.703c1.242.073 2.427.165 3.664.327 17.59 2.307 34.176 16.601 34.176 35.229l-.071 2.021-.209 2.031-4.472 29.884h-7.488c1.594-11.031 2.986-21.898 4.016-32.399l.045-1.537c0-14.456-13.517-25.377-27.027-27.137l-4.137-.252h-43.781c-1.573 0-3.139.085-4.698.31l-.075.007c-15.231 2.052-30.428 14.349-30.428 30.664.037 1.244.097 2.205.213 3.444l4.096 26.9h-8.268l-3.932-25.923c-.1-.78-.181-1.519-.227-2.212a31.291 31.291 0 01-.083-2.209c0-20.485 18.269-36.218 37.622-38.761l.075-.011V39.035c0-1.122.463-2.146 1.207-2.883a4.103 4.103 0 012.892-1.194h.486V9.569h-12.395zm46.665 0h-26.049v25.308h26.049V9.569zm3.955 33.567h-34.61v17.489h34.61V43.136zm26.718 160.989v122.2h-42.742v-122.2h42.742zm106.804 0v122.2h-42.741v-122.2h42.741zM366.112 36.21c19.975 13.947 39.2 26.232 58.882 37.555 19.645 11.281 39.829 21.627 61.814 31.746a1053.384 1053.384 0 008.582-18.87l-16.06-2.758a3.649 3.649 0 01-2.772-2.164c-.976-2.211-1.249-2.852-1.497-3.396-1.555-3.612-2.281-5.279-2.425-5.342-.175-.08-1.62.332-4.319 1.106-1.801.508-4 1.148-6.754 1.81-.144.038-.31.082-.476.128-2.019.362-3.977-.949-4.345-2.992a454.754 454.754 0 01-.916-5.414c-.591-3.538-.334-4.959-.599-5.091-.204-.098-1.34.614-4.286 1.607a169.825 169.825 0 01-7.07 2.251l-.001.001-.166.044a3.711 3.711 0 01-4.478-2.725 337.886 337.886 0 01-1.314-5.767c-.772-3.541-1.128-5.255-1.19-5.29-.066-.058-1.732.287-4.978.927-1.744.339-3.875.757-6.68 1.229-.119.032-.268.047-.388.079a3.73 3.73 0 01-4.14-3.276l-.415-3.738c-.494-4.508-.729-6.714-.729-6.714-.096-.076-2.183.508-6.173 1.603-1.499.402-3.205.884-5.185 1.389-.19.052-.382.102-.553.123-2.045.268-3.909-1.171-4.17-3.191-1.061-8.052-2.179-9.562-3.288-9.418-.637.094-1.539.437-2.442.782-1.389.524-2.778 1.05-4.353 1.166-4.515.368-8.185-1.911-9.439-12.869l-5.051-2.394a698.935 698.935 0 00-12.626 17.863z" />
        </svg>
      ),
    },
    {
      key: "laptops",
      title: "Máy tính xách tay",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-laptop"
          className="size-7 text-black"
          viewBox="0 0 16 16"
        >
          <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
        </svg>
      ),
    },
    {
      key: "smartphones",
      title: "Điện thoại thông minh",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-phone"
           className="size-7 text-black"
          viewBox="0 0 16 16"
        >
          <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
        </svg>
      ),
    },
  ];

  const productsAIRcm = useProducts({ limit: 7 });
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [aiStatus, setAiStatus] = useState("loading");
  const [recommendationRefresh, setRecommendationRefresh] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function getAiRecommendations() {
      setAiStatus("loading");

      try {
        const response = await request({
          reqPATH: "/products/recommendations/home?limit=7",
        });
        if (!response?.ok) {
          throw new Error("Không thể tải gợi ý AI");
        }

        const data = await response.json();
        if (!isActive) return;

        const recommendations = Array.isArray(data.recommendations)
          ? data.recommendations
          : [];
        setAiRecommendations(recommendations);
        setAiStatus(recommendations.length ? "ready" : "empty");
      } catch (error) {
        if (!isActive) return;
        console.error("Lỗi tải gợi ý AI trên trang chủ:", error);
        setAiStatus("error");
      }
    }

    getAiRecommendations();
    return () => {
      isActive = false;
    };
  }, [recommendationRefresh]);

  const categorySectionRef = useRef(null);
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const hasQuerry = search.get("category");
  useEffect(() => {
    if (categorySectionRef.current && hasQuerry) {
      categorySectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [hasQuerry]);
  return (
    <>
      <div className="flex mt-13 gap-5">
        <div className="p-8 bgLeftContainer text-white rounded-2xl flex gap-6 w-[65%]">
          <div className="flex gap-9 flex-col w-[60%]">
            <h1 className="font-bold text-3xl">
              Đại Hội Công Nghệ & Điện Tử Thông Minh
            </h1>
            <span className="text-gray-300">
              Trải nghiệm kỷ nguyên số với trợ lý AI phân tích nhu cầu. Giảm
              chạm đỉnh tới 60%, giao nhanh chuẩn xác 24H toàn quốc
            </span>
            <div className="flex items-center gap-4">
              <p className="bg-white text-black p-[8px_16px] rounded-xl text-sm">
                Mã CODE:{" "}
                <strong className="text-[#004AC6] mr-2">NOVATECH25</strong>
                <button className="bg-[#EAEDFF] !text-[#004AC6] p-[2px_6px] rounded-sm text-[12px] font-medium">
                  Copy
                </button>
              </p>
              <p className="text-[14px] font-medium bg-[#457AE3] p-[6px_12px] rounded-xl">
                Giao 24H Miễn Phí Toàn Quốc
              </p>
            </div>
            <div className="flex gap-5 items-center">
              <button className="bg-white p-[10px_20px] font-bold !text-[#004AC6] rounded-xl flex items-center gap-2">
                Khám phá ngay
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
              <span className="text-[#EAEDFF] text-[12px]">
                Ưu đãi kết thúc sau 3 ngày
              </span>
            </div>
          </div>
          <div className="flex-1 flex items-end">
            <p className="text-[12px] mb-2 bg-[#ffffff3b] p-[4px_10px] rounded-xl">
              Combo giảm thêm 15% khi ghép đôi thiết bị AI
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <div className="bg-white p-5 rounded-xl flex flex-col gap-2 shadow">
            <ContainerHeader
              category={"Thời Trang Cao Cấp"}
              title={"BST Thu Đông Sang Trọng"}
              desc={"Giảm kịch trần đến 50% cho thành viên Nova VIP"}
              btn={"Xem bộ sưu tập >"}
              deal={"-50%"}
              bgCategory={"text-violet-900 bg-violet-200"}
              bgBtn={"!text-violet-700"}
              bgDeal={"bg-[#FFDAD6] text-[#C86D70]"}
            />
          </div>
          <div className="bg-white p-5 rounded-xl flex flex-col gap-2 shadow">
            <ContainerHeader
              category={"Gia Dụng Thông Minh"}
              title={"Tiện Nghi Đột Phá"}
              desc={"Tặng ngay Voucher 300.000đ cho đơn từ 2 triệu"}
              btn={`Lấy voucher ngay `}
              deal={" VOUCHER 300K"}
              bgCategory={"text-violet-900 bg-violet-200"}
              bgBtn={"!text-blue-800"}
              bgDeal={"bg-[#DBE1FF] text-[#00174B]"}
            />
          </div>
        </div>
      </div>
      <ContainerContent>
        <TitleOfCategory />
        <div className="flex overflow-auto gap-20">
          {category.map((category) => (
            <ListCategory
              category={category.key}
              title={category.title}
              icon={category.icon}
            />
          ))}
        </div>
      </ContainerContent>
      <ContainerContent>
        <TitleOfAIRecomment
          isRefreshing={aiStatus === "loading"}
          onRefresh={() => setRecommendationRefresh((value) => value + 1)}
        />
        <div className="flex overflow-auto gap-4">
          {aiRecommendations.map(({ _id, ...p }) => {
            return (
              <Product
                key={_id}
                id={_id}
                {...p}
                bgColor="#FAF8FF"
                textColorPriceSale="#BA1A1A"
                sold="1,2k"
              />
            );
          })}
          {aiStatus === "loading" && (
            <p className="py-8 text-sm text-gray-500">Đang tải gợi ý AI...</p>
          )}
          {aiStatus === "empty" && (
            <p className="py-8 text-sm text-gray-500">
              Chưa có sản phẩm phù hợp để gợi ý.
            </p>
          )}
          {aiStatus === "error" && (
            <p className="py-8 text-sm text-red-700">
              Không tải được gợi ý AI. Hãy thử làm mới.
            </p>
          )}
        </div>
      </ContainerContent>
      <ContainerContent>
        <TitleOfTrendind />
        <div className="flex gap-4 overflow-auto ">
          {productsAIRcm.products?.map(({ _id, ...p }) => {
            return (
              <Product
                key={_id}
                id={_id}
                {...p}
                bgColor="#FAF8FF"
                textColorPriceSale="#BA1A1A"
                sold="1,2k"
              />
            );
          })}
        </div>
      </ContainerContent>
      <ContainerContent>
        <TitleOfBrand />
        <div className="flex gap-4 overflow-auto ">
          <BrandContainer
            logo={logo}
            name={"Dior"}
            follower={"1,8M"}
            voucher={"Voucher đến 1,5Tr"}
          />
        </div>
      </ContainerContent>
      <div className="w p-5 rounded-2xl mt-7 gap-5 flex flex-col">
        <TitleOfSuggestion />
        <div ref={categorySectionRef}>
          <Outlet />
        </div>
        <div className="flex justify-center ">
          <div className=" flex items-center gap-2 bg-white p-[10px_40px] rounded-[7px]">
            <button className="cursor-pointer text-[15px] font-bold !text-[#004AC6]">
              Xem thêm sản phẩm gợi ý
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-3 text-[#004AC6]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-white flex p-5 rounded-2xl justify-between">
        <BottomContentContainer
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          }
          iconColor="#004AC6"
          iconBgColor="#DBE1FF"
          title={"100% Chính hãng"}
          desc={"Cam kết bồi hoàn 200% nếu phát hiện giả"}
        />
        <BottomContentContainer
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
          }
          iconColor="#006242"
          iconBgColor="#6FFBBE"
          title={"Giao Hỏa Tốc 2H"}
          desc={"Áp dụng nội thành Hà Nội & TP.HCM"}
        />
        <BottomContentContainer
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          }
          iconColor="#712AE2"
          iconBgColor="#EADDFF"
          title={"Đổi trả 30 Ngày"}
          desc={"Thủ tục nhanh chóng ngay tại nhà"}
        />
        <BottomContentContainer
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              stroke-linecap="round"
              stroke-linejoin="round"
              className="size-6"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
              <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          }
          iconColor="#131B2E"
          iconBgColor="#E2E7FF"
          title={"Hỗ Trợ 24/7 AI & CSKH"}
          desc={"Tư vấn thông minh & chuyên viên tận tâm"}
        />
      </div>
    </>
  );
}

export default Content;

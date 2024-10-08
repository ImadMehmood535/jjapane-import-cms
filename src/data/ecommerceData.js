import { CgProfile, CgWebsite } from "react-icons/cg";
import { TbListDetails } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { MdCoffeeMaker } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { SiMake } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";
import { LiaBlogSolid } from "react-icons/lia";
import { TbDiscount } from "react-icons/tb";
import { GiTrophy } from "react-icons/gi";
import { RiTrophyLine } from "react-icons/ri";

const ecommerceData = [
  {
    id: 1,
    no: 1,
    icon: <IoIosCreate className="text-themeBtn-0 rounded-none text-2xl" />,
    name: "Store",
    link: "/store",

    subCategories: [
      {
        icon: <TbListDetails className="" />,
        name: "Products ",
        link: "store/products",
      },

      {
        icon: <TbDiscount className="" />,
        name: "Promo ",
        link: "store/promo",
      },
      {
        icon: <MdOutlineRateReview className="" />,
        name: "Reviews ",
        link: "store/reviews",
      },
    ],
  },
  {
    id: 2,
    no: 2,
    icon: <SiMake className="text-themeBtn-0 rounded-none text-2xl" />,
    name: "Orders",
    link: "/store",

    subCategories: [
      {
        icon: <CgFileDocument className="" />,

        name: "General Orders",
        link: "store/order",
      },
    ],
  },
  {
    id: 3,
    no: 3,
    icon: <BsPeopleFill className="text-themeBtn-0 rounded-none text-2xl" />,
    name: "Members",
    link: "/users",

    subCategories: [
      {
        icon: <FaPeopleGroup className="" />,

        name: "All Members",
        link: "store/members",
      },
    ],
  },
  {
    id: 14,
    no: 14,
    icon: <GiTrophy className="text-themeBtn-0 rounded-none text-2xl" />,
    name: "Contests",
    link: "/contest",

    subCategories: [
      {
        icon: <RiTrophyLine className="" />,

        name: "All contests",
        link: "store/contest",
      },
    ],
  },
  {
    id: 5,
    no: 5,
    icon: <CgWebsite className="text-themeBtn-0  rounded-none text-2xl" />,
    name: "Newsletter",
    link: "/",

    subCategories: [
      {
        icon: <LiaBlogSolid className="" />,
        name: "newsletter",
        link: "/dashboard/newsletter",
      },
    ],
  },
];
export { ecommerceData };

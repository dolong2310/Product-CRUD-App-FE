import Image from "next/image";
import CustomImage from "../public/images/customize.jpg";
import AppleWatch from "../public/images/AppleWatchS9.jpg";
import IpadAir from "../public/images/IpadAir.jpg";
import IpadPro from "../public/images/IpadPro.jpg";
import IphonePromax from "../public/images/Iphone16Promax.jpg";
import MacbookPro from "../public/images/MacbookPro14.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  { src: AppleWatch, alt: "Apple Watch S9" },
  { src: IpadAir, alt: "iPad Air" },
  { src: IpadPro, alt: "iPad Pro" },
  { src: IphonePromax, alt: "iPhone 16 Pro Max" },
  { src: MacbookPro, alt: "MacBook Pro 14" },
];

const HomePage = () => {
  return (
    <div className="container py-8">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-96">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HomePage;

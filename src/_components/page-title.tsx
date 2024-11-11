interface SectionTitleProps {
  title: string;
}

export const PageTitle = ({ title }: SectionTitleProps) => {
  return (
    <h1 className="relative text-4xl font-bold tracking-normal before:absolute before:left-0 before:-bottom-3 before:h-1 before:rounded-full before:w-12 before:bg-primary before:content-['']">
      {title}
    </h1>
  );
};

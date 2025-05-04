export default function NotFound() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="container flex flex-col items-center justify-center">
        <div className="text-2xl font-bold">Page Not Found</div>
        <div className="text-sm text-gray-500">
          The page you are looking for does not exist.
        </div>
      </div>
    </div>
  );
}

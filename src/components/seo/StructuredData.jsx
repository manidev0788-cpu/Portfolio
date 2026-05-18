import { getAllStructuredData } from "@/lib/seo/json-ld";

export default function StructuredData() {
  const graphs = getAllStructuredData();

  return (
    <>
      {graphs.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// File: utils/imageService.ts

export interface ImageData {
  url: string;
  alt: string;
  generatedBy: string;
  photographer?: {
    name: string;
    username: string;
    url: string;
  };
}

interface UnsplashPhoto {
  urls: {
    raw: string;
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
}

async function searchUnsplash(query: string): Promise<UnsplashPhoto | null> {
  if (!process.env.UNSPLASH_ACCESS_KEY) {
    console.error("UNSPLASH_ACCESS_KEY is not configured");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results[0] || null;
  } catch (error) {
    console.error("Failed to fetch from Unsplash:", error);
    return null;
  }
}

// Generate a deterministic color based on name (fallback)
function generateColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.abs(hash).toString(16).slice(0, 6);
  return color.padEnd(6, "0");
}

export async function generateCityImage(cityName: string): Promise<ImageData> {
  const photo = await searchUnsplash(`${cityName} city skyline architecture`);

  if (photo) {
    return {
      url: photo.urls.regular,
      alt: photo.alt_description || `View of ${cityName}`,
      generatedBy: "Unsplash",
      photographer: {
        name: photo.user.name,
        username: photo.user.username,
        url: photo.user.links.html,
      },
    };
  }

  // Fallback to generated placeholder
  const color = generateColor(cityName);
  return {
    url: `/api/image-placeholder?width=1200&height=800&text=${encodeURIComponent(
      cityName
    )}&bg=${color}`,
    alt: `View of ${cityName}`,
    generatedBy: "Generated Placeholder",
  };
}

export async function generateLandmarkImage(
  landmark: string
): Promise<ImageData> {
  const photo = await searchUnsplash(`${landmark} landmark architecture`);

  if (photo) {
    return {
      url: photo.urls.regular,
      alt: photo.alt_description || `View of ${landmark}`,
      generatedBy: "Unsplash",
      photographer: {
        name: photo.user.name,
        username: photo.user.username,
        url: photo.user.links.html,
      },
    };
  }

  // Fallback to generated placeholder
  const color = generateColor(landmark);
  return {
    url: `/api/image-placeholder?width=800&height=600&text=${encodeURIComponent(
      landmark
    )}&bg=${color}`,
    alt: `View of ${landmark}`,
    generatedBy: "Generated Placeholder",
  };
}

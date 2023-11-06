package constants

const MOVIES_PER_PAGE = 20
const DISCUSSION_PART_PER_PAGE = int(10)

const MOVIE_JSON_FOR_TESTING = `{
	"adult": false,
	"belongs_to_collection": "Heat Collection",
	"budget": 60000000,
	"genres": [
	  {
		"id": 28,
		"name": "Action"
	  },
	  {
		"id": 80,
		"name": "Crime"
	  },
	  {
		"id": 18,
		"name": "Drama"
	  }
	]
	,"homepage": "https://www.20thcenturystudios.com/movies/heat",
	"id": 1,
	"imdb_id": "tt0113277",
	"original_language": "en",
	"original_title": "Heat",
	"overview": "Obsessive master thief Neil McCauley leads a top-notch crew on various daring heists throughout Los Angeles while determined detective Vincent Hanna pursues him without rest. Each man recognizes and respects the ability and the dedication of the other even though they are aware their cat-and-mouse game may end in violence.",
	"poster_path": "/umSVjVdbVwtx5ryCA2QXL44Durm.jpg",
	"production_companies": [
	  {
		"id": 508,
		"logo_path": "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
		"name": "Regency Enterprises",
		"origin_country": "US"
	  },
	  {
		"id": 675,
		"logo_path": "",
		"name": "Forward Pass",
		"origin_country": "US"
	  },
	  {
		"id": 174,
		"logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
		"name": "Warner Bros. Pictures",
		"origin_country": "US"
	  },
	  {
		"id": 4700,
		"logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
		"name": "The Linson Company",
		"origin_country": "US"
	  },
	  {
		"id": 676,
		"logo_path": "",
		"name": "Monarchy Enterprises B.V.",
		"origin_country": ""
	  },
	  {
		"id": 10104,
		"logo_path": "/wRn5HnYMGeJHmItRypgOZOC6gwY.png",
		"name": "New Regency Pictures",
		"origin_country": "US"
	  }
	],
	"production_countries": [
	  {
		"iso_3166_1": "US",
		"name": "United States of America"
	  }
	],
	"release_date": "1995-12-15",
	"revenue": 187436818,
	"runtime": 170,
	"spoken_languages": [
	  {
		"english_name": "English",
		"iso_639_1": "en",
		"name": "English"
	  },
	  {
		"english_name": "Spanish",
		"iso_639_1": "es",
		"name": "Español"
	  }
	],
	"status": "Released",
	"tagline": "A Los Angeles crime saga.",
	"title": "Heat",
	"video": false,
	"popularity": 17.924927,
	"vote_average": 7.7,
	"vote_count": 1886,
	"backdrop_path": "/X7zKxmyrVmYCfcyvDgVLH8iNzA.jpg"
  }`
const MOVIE_DUPLICATE_FOR_TESTING = `{
	"adult": false,
	"belongs_to_collection": "Heat Collection",
	"budget": 60000000,
	"genres": [
	  {
		"id": 28,
		"name": "Action"
	  },
	  {
		"id": 80,
		"name": "Crime"
	  },
	  {
		"id": 18,
		"name": "Drama"
	  }
	]
	,"homepage": "https://www.20thcenturystudios.com/movies/heat",
	"id": 949,
	"imdb_id": "tt0113277",
	"original_language": "en",
	"original_title": "Heat",
	"overview": "Obsessive master thief Neil McCauley leads a top-notch crew on various daring heists throughout Los Angeles while determined detective Vincent Hanna pursues him without rest. Each man recognizes and respects the ability and the dedication of the other even though they are aware their cat-and-mouse game may end in violence.",
	"poster_path": "/umSVjVdbVwtx5ryCA2QXL44Durm.jpg",
	"production_companies": [
	  {
		"id": 508,
		"logo_path": "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
		"name": "Regency Enterprises",
		"origin_country": "US"
	  },
	  {
		"id": 675,
		"logo_path": "",
		"name": "Forward Pass",
		"origin_country": "US"
	  },
	  {
		"id": 174,
		"logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
		"name": "Warner Bros. Pictures",
		"origin_country": "US"
	  },
	  {
		"id": 4700,
		"logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
		"name": "The Linson Company",
		"origin_country": "US"
	  },
	  {
		"id": 676,
		"logo_path": "",
		"name": "Monarchy Enterprises B.V.",
		"origin_country": ""
	  },
	  {
		"id": 10104,
		"logo_path": "/wRn5HnYMGeJHmItRypgOZOC6gwY.png",
		"name": "New Regency Pictures",
		"origin_country": "US"
	  }
	],
	"production_countries": [
	  {
		"iso_3166_1": "US",
		"name": "United States of America"
	  }
	],
	"release_date": "1995-12-15",
	"revenue": 187436818,
	"runtime": 170,
	"spoken_languages": [
	  {
		"english_name": "English",
		"iso_639_1": "en",
		"name": "English"
	  },
	  {
		"english_name": "Spanish",
		"iso_639_1": "es",
		"name": "Español"
	  }
	],
	"status": "Released",
	"tagline": "A Los Angeles crime saga.",
	"title": "Heat",
	"video": false,
	"popularity": 17.924927,
	"vote_average": 7.7,
	"vote_count": 1886,
	"backdrop_path": "/X7zKxmyrVmYCfcyvDgVLH8iNzA.jpg"
  }`
  const MOVIE_NON_EXISTENT = `{
	"adult": false,
	"belongs_to_collection": "Heat Collection",
	"budget": 60000000,
	"genres": [
	  {
		"id": 28,
		"name": "Action"
	  },
	  {
		"id": 80,
		"name": "Crime"
	  },
	  {
		"id": 18,
		"name": "Drama"
	  }
	]
	,"homepage": "https://www.20thcenturystudios.com/movies/heat",
	"id": 20000,
	"imdb_id": "tt0113277",
	"original_language": "en",
	"original_title": "Heat",
	"overview": "Obsessive master thief Neil McCauley leads a top-notch crew on various daring heists throughout Los Angeles while determined detective Vincent Hanna pursues him without rest. Each man recognizes and respects the ability and the dedication of the other even though they are aware their cat-and-mouse game may end in violence.",
	"poster_path": "/umSVjVdbVwtx5ryCA2QXL44Durm.jpg",
	"production_companies": [
	  {
		"id": 508,
		"logo_path": "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
		"name": "Regency Enterprises",
		"origin_country": "US"
	  },
	  {
		"id": 675,
		"logo_path": "",
		"name": "Forward Pass",
		"origin_country": "US"
	  },
	  {
		"id": 174,
		"logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
		"name": "Warner Bros. Pictures",
		"origin_country": "US"
	  },
	  {
		"id": 4700,
		"logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
		"name": "The Linson Company",
		"origin_country": "US"
	  },
	  {
		"id": 676,
		"logo_path": "",
		"name": "Monarchy Enterprises B.V.",
		"origin_country": ""
	  },
	  {
		"id": 10104,
		"logo_path": "/wRn5HnYMGeJHmItRypgOZOC6gwY.png",
		"name": "New Regency Pictures",
		"origin_country": "US"
	  }
	],
	"production_countries": [
	  {
		"iso_3166_1": "US",
		"name": "United States of America"
	  }
	],
	"release_date": "1995-12-15",
	"revenue": 187436818,
	"runtime": 170,
	"spoken_languages": [
	  {
		"english_name": "English",
		"iso_639_1": "en",
		"name": "English"
	  },
	  {
		"english_name": "Spanish",
		"iso_639_1": "es",
		"name": "Español"
	  }
	],
	"status": "Released",
	"tagline": "A Los Angeles crime saga.",
	"title": "Heat",
	"video": false,
	"popularity": 17.924927,
	"vote_average": 7.7,
	"vote_count": 1886,
	"backdrop_path": "/X7zKxmyrVmYCfcyvDgVLH8iNzA.jpg"
  }`

  const MOVIE_EDIT = `{
	"adult": false,
	"belongs_to_collection": "Heat Collection",
	"budget": 60000000,
	"genres": [
	  {
		"id": 28,
		"name": "Action"
	  },
	  {
		"id": 80,
		"name": "Crime"
	  },
	  {
		"id": 18,
		"name": "Drama"
	  }
	]
	,"homepage": "https://www.20thcenturystudios.com/movies/heat",
	"id": 1,
	"imdb_id": "tt0113277",
	"original_language": "en",
	"original_title": "TESTEDIT",
	"overview": "Obsessive master thief Neil McCauley leads a top-notch crew on various daring heists throughout Los Angeles while determined detective Vincent Hanna pursues him without rest. Each man recognizes and respects the ability and the dedication of the other even though they are aware their cat-and-mouse game may end in violence.",
	"poster_path": "/umSVjVdbVwtx5ryCA2QXL44Durm.jpg",
	"production_companies": [
	  {
		"id": 508,
		"logo_path": "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
		"name": "Regency Enterprises",
		"origin_country": "US"
	  },
	  {
		"id": 675,
		"logo_path": "",
		"name": "Forward Pass",
		"origin_country": "US"
	  },
	  {
		"id": 174,
		"logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
		"name": "Warner Bros. Pictures",
		"origin_country": "US"
	  },
	  {
		"id": 4700,
		"logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
		"name": "The Linson Company",
		"origin_country": "US"
	  },
	  {
		"id": 676,
		"logo_path": "",
		"name": "Monarchy Enterprises B.V.",
		"origin_country": ""
	  },
	  {
		"id": 10104,
		"logo_path": "/wRn5HnYMGeJHmItRypgOZOC6gwY.png",
		"name": "New Regency Pictures",
		"origin_country": "US"
	  }
	],
	"production_countries": [
	  {
		"iso_3166_1": "US",
		"name": "United States of America"
	  }
	],
	"release_date": "1995-12-15",
	"revenue": 187436818,
	"runtime": 170,
	"spoken_languages": [
	  {
		"english_name": "English",
		"iso_639_1": "en",
		"name": "English"
	  },
	  {
		"english_name": "Spanish",
		"iso_639_1": "es",
		"name": "Español"
	  }
	],
	"status": "Released",
	"tagline": "A Los Angeles crime saga.",
	"title": "Heat",
	"video": false,
	"popularity": 17.924927,
	"vote_average": 7.7,
	"vote_count": 1886,
	"backdrop_path": "/X7zKxmyrVmYCfcyvDgVLH8iNzA.jpg"
  }`

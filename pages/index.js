/* eslint-disable @next/next/no-img-element */
import Layout from "../components/Layout";
import { useState, useEffect} from "react";
import Link from 'next/link'

export default function Home({ styles, pokeData }) {
  // console.log(pokeData)
  const [searchResults, setSearchResults] = useState(pokeData)
  const [pokeArr, setPokeArr] = useState(searchResults.slice(0, 10));
  const [pageno, setPageno] = useState(0);
  const [input, setInput] = useState("")
  const [filter, setFilter] = useState("All")
  // console.log(pokeArr);
  useEffect(() => {
    setPokeArr(searchResults.slice(pageno*20, (pageno*20)+20))
  }, [pageno])
  useEffect(()=>{
    setPokeArr(searchResults.slice(0, 10))
  },[searchResults])
  useEffect(()=>{
    if(input.length===0 && filter === "All"){
      setSearchResults(pokeData)
      return
    }
    if(input.length!==0 && filter === "All"){
      setSearchResults(c=>(c=pokeData.filter((pokeman)=>{
        return pokeman.name.english.toLowerCase().includes(input.toLowerCase())
      })))
      return
    }
    if(input.length===0 && filter !== "All"){
      setSearchResults(c=>(c=pokeData.filter((pokeman)=>{
        return pokeman.type.includes(filter)
      })))
      return
    }
    if(input.length!==0 && filter !== "All"){
      setSearchResults(c=>(c=pokeData.filter((pokeman)=>{
        return pokeman.type.includes(filter) && pokeman.name.english.toLowerCase().includes(input.toLowerCase())
      })))
      return
    }
  },[input,filter])
  const handlePrev=()=>{
    setPageno(c=>{return c-1})
  }
  const handleNext=()=>{
    setPageno(c=>{return c+1})
  }
  const handleFilterChange=(e)=>{
    setFilter(e.target.value)
  }
  const handleInputChange=(e)=>{
    setInput(e.target.value)
  }
  console.log(input,filter)
  return (
    <Layout title={"Pokemon"}>
      
    
      <div className="flex flex-wrap justify-center mx-auto">
        {pokeArr.map((pokeman, i) => {
          return (
            
            <div key={pokeman.name.english} className="p-2">
              
              <Link href={`/pokemons/${pokeman.id}`}><a>
              <div className="bg-gray-200 py-4 px-6 rounded">
                #00{pokeman.id}
                <img
                  src={pokeman.image.hires}
                  alt=""
                  className="h-[152px] w-[152px] sm:h-[200px] sm:w-[200px]"
                />
                  <div>
                  <span className="text-3xl">{pokeman.name.english}</span>
                  </div><br />
                <div className="text-left">
                  
                  {pokeman.type.map((type, j) => {
                    return (
                      <span
                        key={type}
                        className="text-white text-xs font-semibold mr-4 px-4 py-2 rounded"
                        style={{ backgroundColor: styles[type.toLowerCase()] }}
                      >
                        {type}
                      </span>
                    );
                  })}
                </div>
                
                
                <p className="text-center">
                  <span className="font-semibold text-3xl mr-2">
                    
                  </span>
                
                </p>
              </div></a></Link>
            </div>
          );
        })}
      </div>
     
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://api.pikaserve.xyz/pokemon/all");
    const data = await res.json();
    return {
      props: {
        pokeData: data,
        styles: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
}

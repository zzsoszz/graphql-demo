var Schema=require("graph.ql");

var characters={
1:{
    id:1,
    name:"qingtian"
},
2:{
    id:2,
    name:"Mat"
},
3:{
    id:3,
    name:"Jack"
}
};
var schema=Schema(`
scalar Date
type Character {
    id: Int!
    name: String!
    homeworld: Planet
    files: [Film]
}
type Film {
    title: String!
    producers(): [String]
    characters(): [Character]
    release_date: Date
}
type Planet {
    name: String!
    population: Int
}
type Query {
    find_film (id: Int): Film
    find_character (id: Int): Character
}
`,{
    Date:{
        serialize:function(v){
            console.log("serialize",v);
            return new Date(v);
        }
    },
    Character:{
        
    },
    Film:{
        producers(film,args){
            return film.producers.split(".");
        },
        characters(film,args)
        {
            return film.character_ids.map(function(id){
                return characters[id];
            });
        }
    },
    Planet:{

    },
    Query:{
        find_film(query,args){
            return {
                title:"A New Home",
                producers:'John Mat Marc',
                release_date:"1984-02-32",
                character_ids:[1,2,3]
            }
        },
        find_character(query,args){
            console.log(query,args);
        }
    }
 }
);

schema(`
    query find($film:Int)
    {
        find_film(id:$film)
        {
            title
            producers
            release_date
            characters{
                id
                name
            }
        }
    }
`,{
    film:1
 }
).then(function(res){
    console.log(res);
});


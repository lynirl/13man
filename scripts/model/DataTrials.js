export const TRIALS = [

/* ================================= */
/* FEATURE SEARCH – 9 ITEMS         */
/* Un seul trait distinctif :        */
/*   couleur OU forme                */
/* ================================= */

// Cible unique par couleur (même forme partout)
{ id:1,  type:"TRAITSIMPLE", nbItems:9, target:{shape:"square",color:"red"},      distractor:{shape:"square",color:"green"} },
{ id:2,  type:"TRAITSIMPLE", nbItems:9, target:{shape:"square",color:"yellow"},   distractor:{shape:"square",color:"blue"} },
{ id:3,  type:"TRAITSIMPLE", nbItems:9, target:{shape:"circle",color:"blue"},     distractor:{shape:"circle",color:"red"} },
{ id:4,  type:"TRAITSIMPLE", nbItems:9, target:{shape:"triangle",color:"green"},  distractor:{shape:"triangle",color:"yellow"} },
{ id:5,  type:"TRAITSIMPLE", nbItems:9, target:{shape:"circle",color:"red"},      distractor:{shape:"circle",color:"green"} },
{ id:6,  type:"TRAITSIMPLE", nbItems:9, target:{shape:"square",color:"blue"},     distractor:{shape:"square",color:"yellow"} },

// Cible unique par forme (même couleur partout)
{ id:7,  type:"TRAITSIMPLE", nbItems:9, target:{shape:"triangle",color:"red"},    distractor:{shape:"square",color:"red"} },
{ id:8,  type:"TRAITSIMPLE", nbItems:9, target:{shape:"circle",color:"green"},    distractor:{shape:"square",color:"green"} },
{ id:9,  type:"TRAITSIMPLE", nbItems:9, target:{shape:"triangle",color:"blue"},   distractor:{shape:"circle",color:"blue"} },
{ id:10, type:"TRAITSIMPLE", nbItems:9, target:{shape:"square",color:"yellow"},   distractor:{shape:"triangle",color:"yellow"} },
{ id:11, type:"TRAITSIMPLE", nbItems:9, target:{shape:"circle",color:"red"},      distractor:{shape:"triangle",color:"red"} },
{ id:12, type:"TRAITSIMPLE", nbItems:9, target:{shape:"triangle",color:"green"},  distractor:{shape:"square",color:"green"} },


/* ================================= */
/* CONJUNCTION SEARCH – 9 ITEMS     */
/* Distracteur A : même forme        */
/* Distracteur B : même couleur      */
/* ================================= */

{ id:13, type:"CONJONCTION", nbItems:9,  target:{shape:"triangle",color:"green"},  distractors:[{shape:"triangle",color:"red"},   {shape:"circle",color:"green"}]},
{ id:14, type:"CONJONCTION", nbItems:9,  target:{shape:"square",color:"blue"},     distractors:[{shape:"square",color:"yellow"},  {shape:"triangle",color:"blue"}]},
{ id:15, type:"CONJONCTION", nbItems:9,  target:{shape:"circle",color:"red"},      distractors:[{shape:"circle",color:"green"},   {shape:"square",color:"red"}]},
{ id:16, type:"CONJONCTION", nbItems:9,  target:{shape:"triangle",color:"yellow"}, distractors:[{shape:"triangle",color:"blue"},  {shape:"circle",color:"yellow"}]},
{ id:17, type:"CONJONCTION", nbItems:9,  target:{shape:"square",color:"green"},    distractors:[{shape:"square",color:"red"},     {shape:"triangle",color:"green"}]},
{ id:18, type:"CONJONCTION", nbItems:9,  target:{shape:"circle",color:"blue"},     distractors:[{shape:"circle",color:"yellow"},  {shape:"square",color:"blue"}]},
{ id:19, type:"CONJONCTION", nbItems:9,  target:{shape:"triangle",color:"red"},    distractors:[{shape:"triangle",color:"green"}, {shape:"circle",color:"red"}]},
{ id:20, type:"CONJONCTION", nbItems:9,  target:{shape:"square",color:"yellow"},   distractors:[{shape:"square",color:"blue"},    {shape:"triangle",color:"yellow"}]},
{ id:21, type:"CONJONCTION", nbItems:9,  target:{shape:"circle",color:"green"},    distractors:[{shape:"circle",color:"red"},     {shape:"square",color:"green"}]},
{ id:22, type:"CONJONCTION", nbItems:9,  target:{shape:"triangle",color:"blue"},   distractors:[{shape:"triangle",color:"yellow"},{shape:"circle",color:"blue"}]},
{ id:23, type:"CONJONCTION", nbItems:9,  target:{shape:"square",color:"red"},      distractors:[{shape:"square",color:"green"},   {shape:"triangle",color:"red"}]},
{ id:24, type:"CONJONCTION", nbItems:9,  target:{shape:"circle",color:"yellow"},   distractors:[{shape:"circle",color:"blue"},    {shape:"square",color:"yellow"}]},


/* ================================= */
/* FEATURE SEARCH – 16 ITEMS        */
/* ================================= */

{ id:25, type:"TRAITSIMPLE", nbItems:16, target:{shape:"square",color:"red"},      distractor:{shape:"square",color:"green"} },
{ id:26, type:"TRAITSIMPLE", nbItems:16, target:{shape:"square",color:"yellow"},   distractor:{shape:"square",color:"blue"} },
{ id:27, type:"TRAITSIMPLE", nbItems:16, target:{shape:"circle",color:"blue"},     distractor:{shape:"circle",color:"red"} },
{ id:28, type:"TRAITSIMPLE", nbItems:16, target:{shape:"triangle",color:"green"},  distractor:{shape:"triangle",color:"yellow"} },
{ id:29, type:"TRAITSIMPLE", nbItems:16, target:{shape:"circle",color:"red"},      distractor:{shape:"circle",color:"green"} },
{ id:30, type:"TRAITSIMPLE", nbItems:16, target:{shape:"square",color:"blue"},     distractor:{shape:"square",color:"yellow"} },

{ id:31, type:"TRAITSIMPLE", nbItems:16, target:{shape:"triangle",color:"red"},    distractor:{shape:"square",color:"red"} },
{ id:32, type:"TRAITSIMPLE", nbItems:16, target:{shape:"circle",color:"green"},    distractor:{shape:"square",color:"green"} },
{ id:33, type:"TRAITSIMPLE", nbItems:16, target:{shape:"triangle",color:"blue"},   distractor:{shape:"circle",color:"blue"} },
{ id:34, type:"TRAITSIMPLE", nbItems:16, target:{shape:"square",color:"yellow"},   distractor:{shape:"triangle",color:"yellow"} },
{ id:35, type:"TRAITSIMPLE", nbItems:16, target:{shape:"circle",color:"red"},      distractor:{shape:"triangle",color:"red"} },
{ id:36, type:"TRAITSIMPLE", nbItems:16, target:{shape:"triangle",color:"green"},  distractor:{shape:"square",color:"green"} },


/* ================================= */
/* CONJUNCTION SEARCH – 16 ITEMS    */
/* ================================= */

{ id:37, type:"CONJONCTION", nbItems:16, target:{shape:"triangle",color:"green"},  distractors:[{shape:"triangle",color:"red"},   {shape:"circle",color:"green"}]},
{ id:38, type:"CONJONCTION", nbItems:16, target:{shape:"square",color:"blue"},     distractors:[{shape:"square",color:"yellow"},  {shape:"triangle",color:"blue"}]},
{ id:39, type:"CONJONCTION", nbItems:16, target:{shape:"circle",color:"red"},      distractors:[{shape:"circle",color:"green"},   {shape:"square",color:"red"}]},
{ id:40, type:"CONJONCTION", nbItems:16, target:{shape:"triangle",color:"yellow"}, distractors:[{shape:"triangle",color:"blue"},  {shape:"circle",color:"yellow"}]},
{ id:41, type:"CONJONCTION", nbItems:16, target:{shape:"square",color:"green"},    distractors:[{shape:"square",color:"red"},     {shape:"triangle",color:"green"}]},
{ id:42, type:"CONJONCTION", nbItems:16, target:{shape:"circle",color:"blue"},     distractors:[{shape:"circle",color:"yellow"},  {shape:"square",color:"blue"}]},
{ id:43, type:"CONJONCTION", nbItems:16, target:{shape:"triangle",color:"red"},    distractors:[{shape:"triangle",color:"green"}, {shape:"circle",color:"red"}]},
{ id:44, type:"CONJONCTION", nbItems:16, target:{shape:"square",color:"yellow"},   distractors:[{shape:"square",color:"blue"},    {shape:"triangle",color:"yellow"}]},
{ id:45, type:"CONJONCTION", nbItems:16, target:{shape:"circle",color:"green"},    distractors:[{shape:"circle",color:"red"},     {shape:"square",color:"green"}]},
{ id:46, type:"CONJONCTION", nbItems:16, target:{shape:"triangle",color:"blue"},   distractors:[{shape:"triangle",color:"yellow"},{shape:"circle",color:"blue"}]},
{ id:47, type:"CONJONCTION", nbItems:16, target:{shape:"square",color:"red"},      distractors:[{shape:"square",color:"green"},   {shape:"triangle",color:"red"}]},
{ id:48, type:"CONJONCTION", nbItems:16, target:{shape:"circle",color:"yellow"},   distractors:[{shape:"circle",color:"blue"},    {shape:"square",color:"yellow"}]}

];
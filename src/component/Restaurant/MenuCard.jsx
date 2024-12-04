import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";

const demo = [
  {
    category: "Nuts & Seeds",
    ingredients: ["Cashews"]
  },
  {
    category: "Protein",
    ingredients: ["Ground beef", "Bacon strips"]
  },
  {
    category: "Bread",
    ingredients: ["Hamburger buns"]
  },
  {
    category: "Vegetable",
    ingredients: ["Tomato Slices ", "Onion slisec"]
  },
  {
    category: "Condiment",
    ingredients: ["Ketchup", "BBQ", "Tatarka"]
  },
]
const MenuCard = () => {

  const handleCheckBoxChange = (value) => {
    console.log("value")

  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img className="w-[7rem] h-[7rem] object-cover" src="http://res.cloudinary.com/dcpesbd8q/image/upload/v1708317657/no8xfzdhsrdy4ezmcczr.jpg" alt=""></img>

            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className=" font-semibold text-xl"> Burger
              </p>

              <p>$5</p>
              <p className=" text-gray-400">Nice burger</p>

            </div>

          </div>



        </div>

        <Typography> </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <form>
            <div className="flex gap-5 flex-wrap">
              {demo.map((item) => (
                <div>
                  <p>  {item.category} </p>
                  <FormGroup>
                    {item.ingredients.map((item) => (
                      <FormControlLabel control={<Checkbox onChange={() => handleCheckBoxChange(item)} />} label={item} />))}
                  </FormGroup>
                </div>
              ))}

            </div>
            <div className="pl-5">
              <Button variant="contained" disabled={false} type="submit">
                {true ? "Add to Cart" : "Out Of Stock"}
              </Button>
            </div>
          </form>
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default MenuCard
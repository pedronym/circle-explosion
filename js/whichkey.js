function WhichKey()
{
	this.convertKey = function(keyCode)
	{
		this.keyCode = keyCode;
		this.keyTyped = "";
		
		switch(this.keyCode)
		{
			case 65:
				this.keyTyped = "A"
				break;
			case 66:
				this.keyTyped = "B"
				break;
			case 67:
				this.keyTyped = "C"
				break;
			case 68:
				this.keyTyped = "D"
				break;
			case 69:
				this.keyTyped = "E"
				break;
			case 70:
				this.keyTyped = "F"
				break;
			case 71:
				this.keyTyped = "G"
				break;
			case 72:
				this.keyTyped = "H"
				break;
			case 73:
				this.keyTyped = "I"
				break;
			case 74:
				this.keyTyped = "J"
				break;
			case 75:
				this.keyTyped = "K"
				break;
			case 76:
				this.keyTyped = "L"
				break;
			case 77:
				this.keyTyped = "M"
				break;
			case 78:
				this.keyTyped = "N"
				break;
			case 79:
				this.keyTyped = "O"
				break;
			case 80:
				this.keyTyped = "P"
				break;
			case 81:
				this.keyTyped = "Q"
				break;
			case 82:
				this.keyTyped = "R"
				break;
			case 83:
				this.keyTyped = "S"
				break;
			case 84:
				this.keyTyped = "T"
				break;
			case 85:
				this.keyTyped = "U"
				break;
			case 86:
				this.keyTyped = "V"
				break;
			case 87:
				this.keyTyped = "W"
				break;
			case 88:
				this.keyTyped = "X"
				break;
			case 89:
				this.keyTyped = "Y"
				break;
			case 90:
				this.keyTyped = "Z"
				break;
		}
		return this.keyTyped;
	}
}
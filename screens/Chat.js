import React, { Component } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";

import { dialogflowConfig } from "./env";

const BOT_USER = {
  _id: 2,
  name: "FAQ Bot",
  avatar:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhAWFRUVFRcVFRUWFRUXFRgYFRYWFhcSFRcYHSggGBolGxUXITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy8lHiUtLS0vMC0tKy0wLS01MDAvLTAtLS0tLTErMDItKzAtLS0rKy0rLi4rLS01LSstLS8tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAwQCBQYBBwj/xABCEAACAQIDBQUEBggFBQEAAAABAgADEQQSIQUxQVFhBhMicYEyUpGhI0JyscHRBxVDYoKSsvAUosLS4TNEU5PxJP/EABoBAQADAQEBAAAAAAAAAAAAAAABAgQDBQb/xAAyEQACAgEBBQUHBAMBAAAAAAAAAQIRAzEEIUFRcRITYYGhBTKRsdHh8CJCwfEUI/IV/9oADAMBAAIRAxEAPwD7jERAERKmLxqU95ueQ3/8Ss5xgrk6RKTehbiaN8fiKn/Sp2HPf82sJE2Gxx/aqOnh/BZwW1J+7GT6Ld6tHTuq1aR0MTlnqbQp62FQDoh+S2aZ4PtWl8lemaTbr6lfUWuvwMlbVC6lceqr7B4ZcN/T8s6aJHTcMAVIIOoINweoMyLATQcjKJEavITA1TALESqWPOYwC5EpyanS5wCaJiTaFN4BlEjZ7HWZA3gGUREAREQBERAEREAREQBESptHE92hbjuXzP8Ad/SVlJRi5PREpW6McTidcie193TzmOH2eo1bxN13f8zHZNCy529ptfQ/nvlyvVCKztuUFj5AXMy4sfePvcvkuCX15l5Ps/piSxKuzcUKtNXHEa+Y0PzBnG9pNv4tsWMHggFYC7VGXecuY2ZgVCgEa2Jvpw10vIqUuZfDs88snGNKk229ySWrO8lHaGzaVdbVEvybcw8j/YnG7B7W16bYmjjrF8PTapmUAE5bDKbeEli4IIA36zWHtLtNqRxyimMOHtkyqdAcpb3yoPhJuNbndOcssGqavy+Zqj7Nz9rVLSne5t6JPx8jesK2AfeXw7H+7e6/yP3dPQrq6h1N1YXBlfZ+Jp43Co+Xw1U1XeVINmW/NWB16TT9nKjUMQ+Fc3UklDwva+nRl+YnOP8Apkkn+iWng+XRmaacr7SqUdfv48zo4lk0xymJo9ZrM5BMkQmSLR5yXdAMUpgTx6tpG9W8jgHrNeZ0ntI4gFmolxK8npPeY1k4wDxa3OSq15VnoMAtxIqdS++SwBERAEREAREQBNBto569Kjw0J9Tr8lPxm/nNs19ogHgNP/UfzmXa98FF8ZRXqdcWrfJNnSTQ9pcSMvdZioIzO4XMAoO48tdSeAHWb6crt+rXQuETPfKwtlvlzWPhLXcgEm2l7Wltqk1Ddx/PXTzGGKciXs7XyMaWZmVi1iVsFdbZlvxvf4gyDtj2sXCr3dMZ8Q48KAXyX0DuBv6LvMq9nqdVQgW+V2DqHCqyJlFlNMEWNtSFAAJNgBYCpt3sTSrYirXbFMha7lRTvlCqtyDflbWccM593S4buXj+dTbihs/f3mdpb63u341oufHhxNY/ZatTwGLxNcscRWRSy3uQne06j5+GYhdRuAFuc2uGxSfqEm4sKLoftFytvMsfnLGweyNPDuWbEPVWrTejkdCAwa2a+vJbevWaw9gqWZgMbVFAOCaXdnNckoLNfKxuCM2QnSWUXHRcK19TdPacOV9nJk3KakmotKtOylwqlT01Og/RmhGz6V+JqEeRqPPe2NEqaVdfaVrX8vEv3N8Zv8Dh0p00p01yoihVXUWAFgNdfjNf2rS9D+Jfxl9ojWztcl8v6PJlm7zaXkr3pN11ZsaDlgCDoQCPI6yzKezTahSv/wCNP6RJHq3mhO1Zlap0SmoIFQc5WiSC1YGeGkJCqk7pYAgERodZiaJk2Yb76SlX2rSR8hfxXAygEm53DTjrAJgCOEnBuJrf1zT700gGLAkE2AUW3kkncJC3aSgGIu2h9oLdT5cflANg62MxmVHEJUVWDaN7JIK38g2+SGh1gEMmp1eBmJpGYFTygFuJDSqcDJoAiIgCIiAJyu1m7rH0ah3OAPU3Q/AMJ1U0HbDAmpQzqPFSObrl+sB8j/DM+0xbx2tVT+B1wtKVPjuN/NZi6tFswqOnhDXJqBbAAF7m+gAIJ5XEx7P7SFekGv418LjqOPkd/wD8msxmysKWqVGWpmbvDUyt7QR6QdbDnZBpqQACdBbp2lOKa0ZMIVJqV2uW82VGtQpBvpKY7uwqM1QXQsdA1z4LnhpJalSk2Yl18Y7s+Ma2YplGu/PUy+ZAmtwuEohCBUq1EZ1e5KHWjVVS+ZQCQWsSSToCdJCuzMOpzfSmwGKzF1OuenULWJvdjhlJAFtTuvpCVKlRfsRvV/n3Nxlo+G7KSpspLC4PeAWHXOAvmAJgDQsbVEAcBiRUXxA52Db9QQH14hTymt/wNN8p7ysA71CNaICnve9y5gNbVAGWxJ04i4kC7CwxKFUrWFIuhDA2QiqRT1OY2NdiAb2IXgI8kOxHi38OviuKOkwboUU02DJlGUqcwIGgsw3zW9pm+jVOJa/wH5kS3spAKQy1HcEs2eoQWbOxbNcADLrpYWta0pv9LWzfVTd6bvifunLan/rWNay3fV+SOcN02+RtKOGAVV91QvwFpkaHWYCqZLTcnhNVUciI0jM0o85NMcw5wAzATW7U2otJbnefZUbz+Q6ybamNSihdhc7lHEnlOFxWIaoxdzcn4DoOkA2O267FaWdjnYd4VB8Kg2yADna+p1lCjiGSoKhF2BzeK+p4E8+cUaoNRWq3YXGbiSB9XXoAJ7jcSa1QsbDMQByUbgPSQSV3a5JJuSbk9TreTYfCuwZ1XwpqxNsumuXXeektbaroXCU7ZKa5FI4ni1+Ov58ZWqYxzTWneyLrYaXN73bmYFnmLxT1Dd2LcuQ6ADQS7s7blWloTnT3WOo+yd4+6auIJo+g4HaNOquZD5g7weREthxznzrCYpqbBkNiPgRyPSdngMYtVA6+RHEHiDJKmyyjlMpUBk9M6awCSIiAIiIAiJixsIBxeOoPgqxrUReixsy8Bc+weQv7J4bvPpNm4mhXU1KYUk2z3AzX5P8AD5SZkvcEXB0IOoN+BE5/F9mXRu9wlTI3uE29Fbl0OnWZOxPC7grjy4rp9Dv2ozVSdPnz6nSDDJYjItjmuMosc5zPfzJJPMz1sMhNyik5cuoHs6+Hy1OnUzmU7Q4ijpicP/F7Pz1U+lpdp9q6J+rU+C/7pZbVh0brruI7nJw3+ZuTh0uDkW4JI0GhJuSOt9ZktNRaygWFhYAWA4DkNJpD2kB0p0mJ6n8BeZAV6vt+BeW75b/jIe1Re7GnJ+Gnx0I7qS950XKtYN9HT3btN1hwElp0AvhHr1MlwuGVBYDzPEye0tixSUu8yO5eiXJfyVlJaLQjSlzmbMBMWqctZATNBQyeoTPKnhXMTYAXJ5DnCLczR9qsfYd0p9rVvsjcPU/d1gEWK2bWxP0t1VbfRqxN8vM2GhO+c9VplWKsLEGxHUTU4Khjf1uMW+LK4YEEp3lQgoKeXuBRHh9rXl9a95usdjFq1XcEam9rgkDcL246SGyyTIYiIAiXcBtDZwrJhK1e+JqhSE+kAUuuZELqMocqQbE8RzF/NrYPuarIDcCxBO+xF9esEWU4iIJE2Wwcb3dUAnwvZW/BvQ/eZrYgH0KWkGgmvwFXPTRuLKpPmRr85sGOkkqYU31MllQGWgYB7ERAEwqLfSZzFmtACoBMHq8pG9QmYQDNNTFXDJYkopPPKJ7QGsldbxqCsiW0At0EnSlzmaqBMQ9zYQDIm0gdyZLWOkrsbCQ3StglpHQzzvOYmOGqA7uUjpqQTyJ0nNZVLsuG9PiujfzVdWTVak+YAG04HaGJ7yoz8zp5DQfKdhtOplpVCPcb5i04dFuQBvOgnUEWKpsVfKCSFJ05Df8AK85+nUKkEGxG6fR8Lhwi2HqeZnMY7su/eHuiuQm4uSMvTdqJ5m03OSlE+j9l5IYoSx5Gt+/w0pr85s1mAxDtUVblsxtbfv5TcuhG8EeYtNlsfYqUfETmf3juHRRw85s2F9CLidcE5QjUt5l29Ys2S8aqlWlX5fX0OGp7Aw4xi41kZqisrhc9qeemAEqMLXJGVdAQPCJt8TiGqOXc3Zjr+AHSXNpYEKM67uI5dRNdNkZKStHkSg4umIiJJAiIgHa9mzejT6ZvkzCbWsdJrOy4/wDzp5v/AFmbHEHdJKkMsUDpK8lonWATxEQBMTqJlIKL8IBgy2MxlmqtxK0AnoiSEzGkNJ6rXgED1CZnhxvmNVLSSiNIB5VtcAzFrDh8ZjWOswCXPtHoOHlKTlKK/Sr+C+ZKSZ7xuAAd2koYPbVKq70wwVlbKLkDPa98uvQzS9v8ey0GoU6gpvVQguTbKu6wNxa9iL8BefC8KrZvAcpGuYEi1uNxLKNe7+ffxCa/d+emnhu6n6N2viKYR6bVUDlDZS6hibXFgTecrs8/SLfn+GnznztOxWJan3ndNYnecgJJ13Fr36HWYbP2xisNdMudE1IYNdAGC796+IgWO4mGrVExdOz7NI6Gzq1VmvXyKPZCKM2t7Zma/LgJx2wf0hUqrLTrUzSZiFDA5kJOgvoCtz0I6zuaVZkvlNri0x9inU0ejHK3FvHV+KT+dlOilZWZKhRlXQOt1ZtfrJuHHcZYns8lDo3bv5bvT6biDGn6N7+6f+Jz02e1sUPYH8X5TWTViVRMOeScqXARETqcBES1s3C97UVOBN2+yN/99YB2uw6WWhTH7t/5vF+MsV14yRBYCe7xJKlWZ0zqJ4y2ni74BbiIgHhlSXJTgFmk1xI6yfOYI1jLO+AebhK6vY3k9U6StALRFxCiwkdB+EkfcYBWJmarbU+k8pW4z2op37/KAfNf0wV+7CMVD98rUwDuXJrm6+2LdROB7H5f8RSzWt3gvfnlbJ/nyz7V2t2BTxlBkdLst2pkGzK3Q9RprpPj1Xsu6m9KoD+64INuVxv+UA+wlwwOosFszAeFFP7OmOLHiZ8m/SOaZxLZFtolxe5zWYG555cnxEsna+0UTLlZv3h3bnzvvJ6kEzkce1QsWqKwJJPiDA3O8ktvPWSDzZ63q0xzqJ/UJ9epbYcDfm6Nv+M+YdkcPnxKHeKYLn0Fh/mIndMZWST1LRk46M3ybZJHsD4yOttJ20Fl8t/xmlRyN0t0qoPnylVCK4F3lm+JnERLFBERAPVUkgAXJ0AG8nkJ2OxNl9yvi9trZug90SLsxhaQUVAcznQk/VPFQOHnxnQESSGeOdDIqL8JnXOkrwQWKqXEgEsUmuJG6a+ZgE8REASq41MtSvWGsAjk1A8JDJ6A0gGVVbiVpbvIKqWgCiNZYkOHG+ZVHsRAI6i2MwViN0ssLiViIBIx0uRrOJ7T7GKMa1MXRtXA+qeJ+yflO1q8ByEwtAPlsyprc2ne4zs7h317vKx3lDl+W75TQbZ2bSoFVp5ixBJLG+m4bh0PwkEmsamLW3So6Eb5dnhEE0UYliph+XwlciCCeniOesyOJ5CVoEAkasT08plhmN5GtMncNOfD4y1Sp2gGx2Rj+5qXPsHRx094dR+c72mwIBBuCLg8+s+aTq+ym0Mymix1XVfs8R6H7+kkNG9xB3SGZ1TrMIIMkaxlnfIEpX3yYC0AyiIgCRVhxksxYXEAqyzTGgle0snQQCHP4ryYi4lWTUX4QDOmthIap1lmRNS6wDyi/CZVF48pgaRko6wCE1egjvTFRbGRwCSqNfOcPtmvnrOeAOUeS6fgT6ztcS9qZf3VY/AX/CfPLwShERIJExZAd4mUQCE4YczLmEwtDKc7MH4X9n0sPvkMTnlx95Hs9prxTp/yTHczZtg7YcktoDmW245jbUc9bek1kX4ROez4ZYlJSldyb0rX7778dETJ3wEsYHEmnUVx9U38xxHqLyvE0FT6HTfPYrqDqD0Ook6U7TUdlsTmoZTvQlfQ6j77ek2j1eUkqSPUAnlM3FzIAJaAgHsREAREQCJl8QmVU6TOR1lJ3QCvEyKnlMYBZpvcTGoxHlIkaxlgi4gGArDlMhUHOV2Fp5ALZExNIcphRfhMql94gGu2/wCHD1LHgB/MwH4zhp2faSoTh381/rWcZBKEREgkREQBERAEREAREQDedk6njdeag/ym3+qdNOU7LD6Y/YP3rOsUXkkMloLxk0hrVlprd2CqOLEAfEyps/a1KszLSJbKNWykL5XPH8oINjERAEREATwmexAMQ45xlHKRVafESMGATmkJki2kAqnnMxW6QDKql5AVPKWUe8ygFQGWUa4gqOUIgG6Aa3bdC9GoB7tx/D4rfKcLPppE+fbVwRo1WThvXqp3fl6QSinERIJEREAREQBERAERLNHZ9ZxdKRYHcdAPiSIBe2DjKVEO9SoATZQupaw1JsOenwmeM7X2BFGnr77/AIKPxPpI8H2QqtrVqKg5DxN+AHznRbN2BQo2KpmYfXfVvTgPQSSpzWB2NiMWwqYh2VObe0RyRdyjrb4zssFhEpIEprlUf3cniZZiAIiIAiIgCIiAJBUpcRJ4gFOJPUp33SEiAe02sZYYXEqyai/CAR6iZCqZnVTjIIBMK/SUtq4FK6WJsw9lrbuh6SeewDhMbgnpGzrbkd6nyMrzua20MPcrUr0QdxRnT4MCdJx3aKtTFcijlyZV9nVSTc3FuhG7lITT0LuMoq2qsrxK4xJ5R/ienzgiyxEk2OorVkptdQ17kb9FLcfKb3bWxKdKjnQsSGFySDodNwA6QRZz0REElnZjKKqZwCt7EHdroCfIkH0nf06fP0E+bzvti43vaKsT4h4W+0Pz0PrJIZsIiIIEREAREQBERAEREAREQBMWW8yiAQNR5SPdLc8IgGNNriQ1EsZMqW3T1heAV0QmUe0SVP8AC1RRBLkBRl0bUgMRyOUmbfdIXcnhaRJWmi+OfYmpVdNPfp5nxvEYCrT9uk6W95GA+YkNOoRzn2eV62Apt7dFH+0it94mD/Ba92Xp9D3l7dUlWTHd+N+jXzZ8mTGHiAfS0kGLHX5T6XV7OYdv+3T0GX7iJGeyOEP7C38VT/dOihtEf3J9f6M0to9mz3vFJdP+l8jhtibSRK9NmNlDak7gCCCdPOb3bHa6g6NTRXa9rMQFGhBBAJvw5CZ9qeyqimpwtA5s9jYsTlyn3joLgfGaXDdi8W29VT7Tj/TcznPJtEX2avojTi2f2bkj3l0uTlT11q7+DKv60Xk3y/OYvtYcFPqbToML+j9v2tcDmEUn4MxH3Td4TsZhE1KM5/fbT+VbA+olo/5UtaXwOc//AC4aXLo5fy4nAU8TWqnLTpknkqsW/Gdp2K2TiKJdqxAWoB4SbvmFrMbaDQnjfdynUYXDIgyoioOSqFHwEnnWGztSUpybaMmfb4SxvFhxqMXrxfx+t1wrfaIiaTzRERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA//2Q==",
};

class Chat extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am DinDin`,
        createdAt: new Date(),
        user: BOT_USER,
      },
    ],
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    let text = "";
    text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg;
    if ((text == "Thank")) {
      msg = {
        _id: this.state.messages.length + 1,
        text: "Thank You",
        image:
          "https://scontent.fbkk5-3.fna.fbcdn.net/v/t1.15752-9/s180x540/254292400_4361804587281509_1910416649487179517_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeFQjOzKwPqMSSx4RGCoWhaNUpMVyx1k4ctSkxXLHWThy5plGxpIu6JL_o6ve3VWPV630gveKX8P_zSds0vjtGWZ&_nc_ohc=EpfIfqIDv4gAX_7XeXk&_nc_ht=scontent.fbkk5-3.fna&oh=485da99598944c88bbb9fb9fbbfe3652&oe=61AF0E4E",
        createdAt: new Date(),
        user: BOT_USER,
      };
    
    } else {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT_USER,
      };
    }

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

export default Chat;

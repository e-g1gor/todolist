package egor.todolist.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IndexPage {
    @GetMapping({ "/" })
    public String hello(Model model,
            @RequestParam(value = "name", required = false, defaultValue = "World (default)") String name) {
        model.addAttribute("name", name);
        return "index";
    }
}